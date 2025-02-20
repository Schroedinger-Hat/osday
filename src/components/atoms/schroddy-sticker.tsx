"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import schroddySticker from "~/assets/images/schroddy-sticker.png";
import { cn } from "~/lib/utils";

// Desktop interactive version
function DesktopSchroddy() {
  const router = useRouter();
  const [isDetached, setIsDetached] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const detachedRef = useRef<HTMLDivElement>(null);

  const handleFirstClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDetached && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      // Calculate vector from click to center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate movement away from click with a larger distance (300px)
      const moveX = (dx / distance) * -300;
      const moveY = (dy / distance) * -300;

      // Ensure Schroddy stays within viewport bounds
      setPosition({
        x: Math.min(
          Math.max(rect.left + moveX, 20),
          window.innerWidth - rect.width - 20,
        ),
        y: Math.min(
          Math.max(rect.top + moveY, 20),
          window.innerHeight - rect.height - 20,
        ),
      });
      setIsDetached(true);
    }
  };

  const handleDetachedClick = () => {
    if (isDetached) {
      router.push("/schroddy");
    }
  };

  useEffect(() => {
    if (!isDetached || !detachedRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = detachedRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate vector from mouse to Schroddy
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only move if mouse is within 200px
      if (distance < 200) {
        // Calculate new position - move away from mouse
        const moveX = (dx / distance) * -20;
        const moveY = (dy / distance) * -20;

        setPosition((prev) => ({
          x: Math.min(
            Math.max(prev.x + moveX, 0),
            window.innerWidth - rect.width,
          ),
          y: Math.min(
            Math.max(prev.y + moveY, 0),
            window.innerHeight - rect.height,
          ),
        }));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDetached]);

  return (
    <>
      <div
        ref={containerRef}
        onClick={handleFirstClick}
        className={cn(
          "transition-scale cursor-pointer select-none duration-200 hover:scale-110",
          isDetached && "opacity-0",
        )}
      >
        <Image
          src={schroddySticker}
          alt="Schroddy"
          width={240}
          height={240}
          className="pointer-events-none"
        />
      </div>

      {isDetached && (
        <div
          ref={detachedRef}
          onClick={handleDetachedClick}
          className="fixed z-[5000] cursor-pointer select-none transition-transform duration-200 hover:scale-110"
          style={{
            left: 0,
            top: 0,
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <Image
            src={schroddySticker}
            alt="Schroddy"
            width={240}
            height={240}
            className="pointer-events-none"
          />
        </div>
      )}
    </>
  );
}

// Mobile simple link version
function MobileSchroddy() {
  return (
    <a
      href="/schroddy"
      className="cursor-pointer select-none transition-all duration-200 hover:scale-110"
    >
      <Image
        src={schroddySticker}
        alt="Schroddy"
        width={240}
        height={240}
        className="pointer-events-none"
      />
    </a>
  );
}

// Main component with viewport detection
export function SchroddySticker() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopSchroddy />
      </div>
      <div className="block md:hidden">
        <MobileSchroddy />
      </div>
    </>
  );
}
