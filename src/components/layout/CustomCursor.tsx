"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const isHovering = useRef(false);

  const SPEED = 0.35;

  const getAngle = (diffX: number, diffY: number) =>
    (Math.atan2(diffY, diffX) * 180) / Math.PI;

  const getSqueeze = (diffX: number, diffY: number) => {
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
    const maxSqueeze = 0.15;
    const accelerator = 1500;
    return Math.min(distance / accelerator, maxSqueeze);
  };

  const updateCursor = useCallback(() => {
    const cursor = cursorRef.current;
    const circle = circleRef.current;
    if (!cursor || !circle) return;

    const diffX = mouse.current.x - pos.current.x;
    const diffY = mouse.current.y - pos.current.y;

    pos.current.x += diffX * SPEED;
    pos.current.y += diffY * SPEED;

    const angle = getAngle(diffX, diffY);
    const squeeze = getSqueeze(diffX, diffY);

    const scale = `scale(${1 + squeeze}, ${1 - squeeze})`;
    const rotate = `rotate(${angle}deg)`;
    const translate = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;

    cursor.style.transform = translate;
    circle.style.transform = rotate + " " + scale;

    rafId.current = requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    // Only activate on devices with fine pointer (desktop)
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    if (!mediaQuery.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseEnterClickable = () => {
      isHovering.current = true;
      cursorRef.current?.classList.add("is-clickable");
    };

    const onMouseLeaveClickable = () => {
      isHovering.current = false;
      cursorRef.current?.classList.remove("is-clickable");
    };

    const CLICKABLE_SELECTOR =
      'a, button, [role="button"], input[type="submit"], input[type="button"], [cursor-class], .cursor-pointer, summary';

    const bindClickables = () => {
      document.querySelectorAll(CLICKABLE_SELECTOR).forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterClickable);
        el.addEventListener("mouseleave", onMouseLeaveClickable);
      });
    };

    // Observe DOM changes to bind new clickable elements
    const observer = new MutationObserver(() => {
      bindClickables();
    });

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.classList.add("custom-cursor-active");
    bindClickables();
    observer.observe(document.body, { childList: true, subtree: true });

    rafId.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.classList.remove("custom-cursor-active");
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
      document.querySelectorAll(CLICKABLE_SELECTOR).forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterClickable);
        el.removeEventListener("mouseleave", onMouseLeaveClickable);
      });
    };
  }, [updateCursor]);

  return (
    <div id="custom-cursor" ref={cursorRef}>
      <div className="custom-cursor__circle" ref={circleRef} />
    </div>
  );
}
