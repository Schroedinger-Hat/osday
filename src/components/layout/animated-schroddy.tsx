"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type StaticImageData } from "next/image";

interface AnimatedSchroddyProps {
  src: StaticImageData;
}

export function AnimatedSchroddy({ src }: AnimatedSchroddyProps) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-20%" }}
        transition={{
          delay: 5,
          duration: 1,
          type: "spring",
          stiffness: 100,
        }}
        className="absolute -right-48 top-24"
      >
        <Image
          src={src}
          alt="Schroddy"
          width={600}
          height={600}
          className="-rotate-12 opacity-25"
        />
      </motion.div>
    </div>
  );
}
