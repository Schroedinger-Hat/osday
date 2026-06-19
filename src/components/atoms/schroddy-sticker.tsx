"use client";

import Image from "next/image";
import schroddySticker from "~/assets/images/schroddy-sticker.png";

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
        {/* <DesktopSchroddy /> */}
        <MobileSchroddy />
      </div>
      <div className="block md:hidden">
        <MobileSchroddy />
      </div>
    </>
  );
}
