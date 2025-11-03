'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import './orbit-photo-gallery.css';
import { GalleryImageSource } from '@/lib/image-gallery-map';

interface PhotoItem {
  id: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  imageUrl: string;
}

interface OrbitPhotoGalleryProps {
  images?: GalleryImageSource[];
  bgColor?: string;
}

const OrbitPhotoGallery: React.FC<OrbitPhotoGalleryProps> = ({ images, bgColor = 'rgb(235,235,235)' }) => {
  const MAX_POLAR_ROT_DEG = 3;
  const PAN_SENSITIVITY = 18;
  const TRANSITION_DUR_MS = 300;

  const sphereRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
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

  // Shuffle array using Fisher-Yates algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

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

    // Shuffle images if provided
    const shuffledImages = images && images.length > 0 ? shuffleArray(images) : null;

    let imageIndex = 0;
    positions.forEach(({ x, yRange }) => {
      yRange.forEach((y) => {
        // Use shuffled custom images if provided, otherwise fallback to Picsum
        const imageUrl = shuffledImages
          ? shuffledImages[imageIndex % shuffledImages.length].url
          : `https://picsum.photos/seed/${imageIndex}/800/800`;

        items.push({
          id: `photo-${x}-${y}`,
          x,
          y,
          sizeX: 2,
          sizeY: 2,
          imageUrl,
        });
        imageIndex++;
      });
    });

    return items;
  };

  // Memoize photo items to prevent re-shuffling on every render
  const photoItems = useMemo(() => generatePhotoItems(), [images]);

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
    setCancelTap(false); // Initialize as false, will be set to true if dragging occurs
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
    const dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // If dragged more than 5 pixels, it's a drag, not a click
    if (dragDistance > 5) {
      setCancelTap(true);
    }

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

    // Start inertia with calculated velocity
    startInertia(velocityRef.current.x, velocityRef.current.y);
  };

  // Handle photo click to enlarge
  const handlePhotoClick = (e: React.MouseEvent, item: PhotoItem) => {
    if (cancelTap) return;

    e.stopPropagation();

    const el = e.currentTarget as HTMLElement;
    const parentEl = el.parentElement as HTMLElement;

    if (!sphereRef.current || !mainRef.current) return;

    // Close any existing popup first
    const existingEnlarge = document.querySelector('.enlarge');
    if (existingEnlarge) {
      existingEnlarge.remove();
    }

    setFocusedItem(item.id);

    // Smoothly bring card forward with scale
    el.style.transition = `transform ${TRANSITION_DUR_MS}ms ease-out, z-index 0s`;
    el.style.transform = `scale(1.1) translateZ(50px)`;
    el.style.zIndex = '3';

    setTimeout(() => {
      // Create fullscreen popup
      const enlargementEl = document.createElement('div');

      enlargementEl.classList.add(
        'enlarge',
        'fixed',
        'top-0',
        'left-0',
        'w-screen',
        'h-screen',
        'z-[100]',
        'flex',
        'items-center',
        'justify-center',
        'p-8',
        'opacity-0',
        'transition-opacity',
        'duration-300',
        'cursor-pointer'
      );

      // Click on popup to close
      enlargementEl.addEventListener('click', handleScrimClick);

      const img = document.createElement('img');
      const imageUrl = parentEl.getAttribute('data-image-url') || '';
      img.src = imageUrl;
      img.alt = 'Enlarged photo';
      img.className = 'max-w-[70vw] max-h-[70vh] object-contain rounded-[32px] shadow-2xl';

      enlargementEl.appendChild(img);
      document.body.appendChild(enlargementEl);

      // Show popup and scrim
      requestAnimationFrame(() => {
        enlargementEl.style.opacity = '1';
        setIsEnlarging(true);
        if (scrimRef.current) {
          scrimRef.current.style.opacity = '1';
          scrimRef.current.style.pointerEvents = 'auto';
        }
      });
    }, TRANSITION_DUR_MS);
  };

  // Handle scrim click to close enlarged photo
  const handleScrimClick = () => {
    const el = document.querySelector('[data-focused="true"]') as HTMLElement;

    const enlargedImg = document.querySelector('.enlarge');
    if (enlargedImg) {
      (enlargedImg as HTMLElement).style.opacity = '0';
      setTimeout(() => enlargedImg.remove(), TRANSITION_DUR_MS);
    }

    if (scrimRef.current) {
      scrimRef.current.style.opacity = '0';
      scrimRef.current.style.pointerEvents = 'none';
    }

    // Reset card state
    if (el) {
      el.style.transition = `transform ${TRANSITION_DUR_MS}ms ease-in, z-index 0s ${TRANSITION_DUR_MS}ms`;
      el.style.transform = '';
      el.style.zIndex = '0';
    }

    setIsEnlarging(false);
    setFocusedItem(null);
  };

  useEffect(() => {
    return () => {
      stopInertia();
    };
  }, [stopInertia]);

  // Handle ESC key to close popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEnlarging) {
        handleScrimClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnlarging]);

  return (
    <main
      ref={mainRef}
      className="orbit-gallery-container fixed top-0 left-0 flex w-full h-[70vh] justify-center items-center overflow-hidden touch-none m-0 p-0 z-0"
      style={{ transformStyle: 'flat', backgroundColor: bgColor }}
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
              data-image-url={item.imageUrl}
              data-index={index}
            >
              <div
                className="item__image absolute block inset-[10px] rounded-xl bg-[rgb(225,225,225)] overflow-hidden cursor-pointer transition-transform duration-300"
                onClick={(e) => handlePhotoClick(e, item)}
                data-focused={focusedItem === item.id}
              >
                <img
                  src={item.imageUrl}
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

      {/* Scrim overlay for popup background */}
      <div
        className="scrim fixed top-0 left-0 w-screen h-screen bg-black/70 pointer-events-none opacity-0 transition-opacity duration-300 z-[99]"
        ref={scrimRef}
        onClick={handleScrimClick}
      ></div>
    </main>
  );
};

export default OrbitPhotoGallery;
