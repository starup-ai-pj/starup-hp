'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import './orbit-photo-gallery.css';

interface PhotoItem {
  id: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
}

const OrbitPhotoGallery: React.FC = () => {
  const MAX_POLAR_ROT_DEG = 3;
  const PAN_SENSITIVITY = 18;
  const TRANSITION_DUR_MS = 300;

  const sphereRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [startRotation, setStartRotation] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [cancelTap, setCancelTap] = useState(false);
  const [isEnlarging, setIsEnlarging] = useState(false);
  const [focusedItem, setFocusedItem] = useState<string | null>(null);

  const inertiaFrameRef = useRef<number | null>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMoveTimeRef = useRef<number>(0);
  const lastMoveRef = useRef({ x: 0, y: 0 });

  // Generate photo items data
  const generatePhotoItems = (): PhotoItem[] => {
    const items: PhotoItem[] = [];
    const positions = [
      // Row pattern from the original code
      { x: -37, yRange: [-4, -2, 0, 2, 4] },
      { x: -35, yRange: [-3, -1, 1, 3, 5] },
      { x: -33, yRange: [-4, -2, 0, 2, 4] },
      { x: -31, yRange: [-3, -1, 1, 3, 5] },
      { x: -29, yRange: [-4, -2, 0, 2, 4] },
      { x: -27, yRange: [-3, -1, 1, 3, 5] },
      { x: -25, yRange: [-4, -2, 0, 2, 4] },
      { x: -23, yRange: [-3, -1, 1, 3, 5] },
      { x: -21, yRange: [-4, -2, 0, 2, 4] },
      { x: -19, yRange: [-3, -1, 1, 3, 5] },
      { x: -17, yRange: [-4, -2, 0, 2, 4] },
      { x: -15, yRange: [-3, -1, 1, 3, 5] },
      { x: -13, yRange: [-4, -2, 0, 2, 4] },
      { x: -11, yRange: [-3, -1, 1, 3, 5] },
      { x: -9, yRange: [-4, -2, 0, 2, 4] },
      { x: -7, yRange: [-3, -1, 1, 3, 5] },
      { x: -5, yRange: [-4, -2, 0, 2, 4] },
      { x: -3, yRange: [-3, -1, 1, 3, 5] },
      { x: -1, yRange: [-4, -2, 0, 2, 4] },
      { x: 1, yRange: [-3, -1, 1, 3, 5] },
      { x: 3, yRange: [-4, -2, 0, 2, 4] },
      { x: 5, yRange: [-3, -1, 1, 3, 5] },
      { x: 7, yRange: [-4, -2, 0, 2, 4] },
      { x: 9, yRange: [-3, -1, 1, 3, 5] },
      { x: 11, yRange: [-4, -2, 0, 2, 4] },
      { x: 13, yRange: [-3, -1, 1, 3, 5] },
      { x: 15, yRange: [-4, -2, 0, 2, 4] },
      { x: 17, yRange: [-3, -1, 1, 3, 5] },
      { x: 19, yRange: [-4, -2, 0, 2, 4] },
      { x: 21, yRange: [-3, -1, 1, 3, 5] },
      { x: 23, yRange: [-4, -2, 0, 2, 4] },
      { x: 25, yRange: [-3, -1, 1, 3, 5] },
      { x: 27, yRange: [-4, -2, 0, 2, 4] },
      { x: 29, yRange: [-3, -1, 1, 3, 5] },
      { x: 31, yRange: [-4, -2, 0, 2, 4] },
      { x: 33, yRange: [-3, -1, 1, 3, 5] },
      { x: 35, yRange: [-4, -2, 0, 2, 4] },
    ];

    positions.forEach(({ x, yRange }) => {
      yRange.forEach((y) => {
        items.push({
          id: `photo-${x}-${y}`,
          x,
          y,
          sizeX: 2,
          sizeY: 2,
        });
      });
    });

    return items;
  };

  const photoItems = generatePhotoItems();

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  const applyTransform = useCallback((rotX: number, rotY: number) => {
    if (sphereRef.current) {
      sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaFrameRef.current) {
      cancelAnimationFrame(inertiaFrameRef.current);
      inertiaFrameRef.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (velocityX: number, velocityY: number) => {
      let vx = velocityX * 100;
      let vy = velocityY * 100;

      const friction = 0.92;
      const minVelocity = 0.1;
      const maxFrames = 120;
      let frameCount = 0;

      const step = () => {
        vx *= friction;
        vy *= friction;

        if (Math.abs(vx) < minVelocity && Math.abs(vy) < minVelocity) {
          inertiaFrameRef.current = null;
          return;
        }

        const proposedX = rotation.x - vy / 200;

        const newRotX = clamp(proposedX, -MAX_POLAR_ROT_DEG, MAX_POLAR_ROT_DEG);
        const newRotY = rotation.y + vx / 200;

        setRotation({ x: newRotX, y: newRotY });
        applyTransform(newRotX, newRotY);

        frameCount++;
        if (frameCount > maxFrames) {
          inertiaFrameRef.current = null;
          return;
        }

        inertiaFrameRef.current = requestAnimationFrame(step);
      };

      stopInertia();
      inertiaFrameRef.current = requestAnimationFrame(step);
    },
    [rotation, applyTransform, stopInertia]
  );

  // Mouse/Touch event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setCancelTap(true);
    stopInertia();
    setIsPanning(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartRotation({ x: rotation.x, y: rotation.y });
    lastMoveTimeRef.current = Date.now();
    lastMoveRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPanning) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    const proposedX = startRotation.x - deltaY / PAN_SENSITIVITY;

    const newRotY = startRotation.y + deltaX / PAN_SENSITIVITY;
    const newRotX = clamp(proposedX, -MAX_POLAR_ROT_DEG, MAX_POLAR_ROT_DEG);

    setRotation({ x: newRotX, y: newRotY });
    applyTransform(newRotX, newRotY);

    // Calculate velocity
    const now = Date.now();
    const timeDelta = now - lastMoveTimeRef.current;
    if (timeDelta > 0) {
      velocityRef.current = {
        x: (e.clientX - lastMoveRef.current.x) / timeDelta,
        y: (e.clientY - lastMoveRef.current.y) / timeDelta,
      };
    }
    lastMoveTimeRef.current = now;
    lastMoveRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    if (!isPanning) return;

    setIsPanning(false);
    setTimeout(() => setCancelTap(false), 100);

    // Start inertia with calculated velocity
    startInertia(velocityRef.current.x, velocityRef.current.y);
  };

  // Handle photo click to enlarge
  const handlePhotoClick = (e: React.MouseEvent, item: PhotoItem) => {
    if (cancelTap) return;

    e.stopPropagation();

    const el = e.currentTarget as HTMLElement;
    const parentEl = el.parentElement as HTMLElement;

    if (!sphereRef.current || !frameRef.current || !mainRef.current) return;

    setFocusedItem(item.id);

    // Get rotation values
    const getTransformRotation = (element: HTMLElement) => {
      const str = element.style.transform;
      const matchX = str.match(/rotateX\((-?\d+(\.\d+)?)deg\)/);
      const matchY = str.match(/rotateY\((-?\d+(\.\d+)?)deg\)/);

      return {
        rotateX: matchX ? parseFloat(matchX[1]) : 0,
        rotateY: matchY ? parseFloat(matchY[1]) : 0,
      };
    };

    const getRotationXY = (element: HTMLElement) => {
      const style = window.getComputedStyle(element);
      const transform = style.transform;

      if (!transform || transform === 'none') {
        return { rotateX: 0, rotateY: 0 };
      }

      if (!transform.startsWith('matrix3d')) {
        return { rotateX: 0, rotateY: 0 };
      }

      const values = transform
        .match(/matrix3d\((.+)\)/)![1]
        .split(',')
        .map(parseFloat);

      const rotateX = Math.asin(-values[9]) * (180 / Math.PI);
      const rotateY = Math.atan2(values[8], values[10]) * (180 / Math.PI);

      return { rotateX, rotateY };
    };

    const parentRotation = getRotationXY(parentEl);
    const globalRotation = getTransformRotation(sphereRef.current);

    const normalizeDegrees = (deg: number) => ((deg % 360) + 360) % 360;
    const parentY = normalizeDegrees(parentRotation.rotateY);
    const globalY = normalizeDegrees(globalRotation.rotateY);

    let rotY = -(parentY + globalY) % 360;
    if (rotY < -180) rotY += 360;

    parentEl.style.setProperty('--rot-y-delta', `${rotY}deg`);

    const rotX = -parentRotation.rotateX - globalRotation.rotateX;
    parentEl.style.setProperty('--rot-x-delta', `${rotX}deg`);

    // Create reference div for positioning
    const referenceDiv = document.createElement('div');
    parentEl.appendChild(referenceDiv);
    referenceDiv.style.opacity = '0';
    referenceDiv.classList.add('item__image', 'item__image--reference');
    referenceDiv.style.transform = `rotateX(${-parentRotation.rotateX}deg) rotateY(${-parentRotation.rotateY}deg)`;

    const sourceRect = referenceDiv.getBoundingClientRect();
    const targetRect = frameRef.current.getBoundingClientRect();
    const deltaScaleX = targetRect.width / sourceRect.width;
    const deltaScaleY = targetRect.height / sourceRect.height;
    const deltaScale = Math.min(deltaScaleX, deltaScaleY);

    el.style.transform = `scale(${deltaScale}) translateZ(30px)`;
    el.style.zIndex = '3';

    setTimeout(() => {
      const renderedRect = el.getBoundingClientRect();
      const enlargementEl = document.createElement('div');

      Object.assign(enlargementEl.style, {
        top: renderedRect.top - mainRef.current!.getBoundingClientRect().top + 'px',
        left: renderedRect.left + 'px',
        width: renderedRect.width + 'px',
        height: renderedRect.height + 'px',
        opacity: '0',
      });

      setTimeout(() => {
        enlargementEl.style.opacity = '1';
        setIsEnlarging(true);
      }, TRANSITION_DUR_MS);

      const img = document.createElement('img');
      // Use higher resolution image
      const imageIndex = parentEl.getAttribute('data-index') || '0';
      img.src = `https://picsum.photos/seed/${imageIndex}/1200/1200`;
      img.alt = 'Enlarged photo';
      img.className = 'w-full h-full object-cover';

      enlargementEl.classList.add('enlarge', 'absolute', 'z-[1]', 'rounded-[32px]', 'overflow-hidden', 'transition-opacity', 'duration-300');
      enlargementEl.appendChild(img);
      viewerRef.current?.appendChild(enlargementEl);

      referenceDiv.remove();
    }, TRANSITION_DUR_MS);
  };

  // Handle scrim click to close enlarged photo
  const handleScrimClick = () => {
    const el = document.querySelector('[data-focused="true"]') as HTMLElement;
    if (!el) return;

    const parentEl = el.parentNode as HTMLElement;
    const referenceDiv = document.querySelector('.item__image--reference');
    referenceDiv?.remove();

    const enlargedImg = document.querySelector('.enlarge');
    enlargedImg?.remove();

    parentEl.style.setProperty('--rot-y-delta', '0deg');
    parentEl.style.setProperty('--rot-x-delta', '0deg');
    el.style.transform = '';
    el.style.zIndex = '0';

    setTimeout(() => {
      setIsEnlarging(false);
      setFocusedItem(null);
    }, TRANSITION_DUR_MS);
  };

  useEffect(() => {
    return () => {
      stopInertia();
    };
  }, [stopInertia]);

  return (
    <main
      ref={mainRef}
      className="flex w-full h-[60vh] justify-center items-center overflow-hidden touch-none bg-[rgb(235,235,235)] m-0 p-0"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      data-enlarging={isEnlarging}
    >
      <div className="stage">
        <div className="sphere" ref={sphereRef}>
          {photoItems.map((item, index) => (
            <div
              key={item.id}
              className="item"
              data-item={`${item.x},${item.y}`}
              data-item-size={`${item.sizeX},${item.sizeY}`}
              data-src={`https://picsum.photos/seed/${index}/800/800`}
              data-index={index}
            >
              <div
                className="item__image absolute block inset-[10px] rounded-xl bg-[rgb(225,225,225)] overflow-hidden cursor-pointer transition-transform duration-300"
                onClick={(e) => handlePhotoClick(e, item)}
                data-focused={focusedItem === item.id}
              >
                <img
                  src={`https://picsum.photos/seed/${index}/800/800`}
                  alt={`Photo ${item.id}`}
                  draggable="false"
                  className="object-cover w-full h-full pointer-events-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overlay fixed inset-0 m-auto z-[3] pointer-events-none opacity-100"></div>
      <div className="overlay overlay--blur fixed inset-0 m-auto z-[3] opacity-100 pointer-events-none"></div>

      <div className="viewer absolute inset-0 z-[9] pointer-events-none flex items-center justify-center p-[100px]" ref={viewerRef}>
        <div className="scrim absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300" ref={scrimRef} onClick={handleScrimClick}></div>
        <div className="frame h-full aspect-square rounded-[32px] flex" ref={frameRef}>
          <div className="enlarged"></div>
        </div>
      </div>
    </main>
  );
};

export default OrbitPhotoGallery;
