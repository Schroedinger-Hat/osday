"use client";

import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";

// Dynamically import ThreeScene to avoid SSR issues
const ThreeScene = dynamic(() => import("./components/ThreeScene"), {
  ssr: false,
});

export default function SchroddyPage() {
  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Got it!</Heading>
        <Typography variant="large">
          Schroddy is our mascot.
          <br />
          But he is also the trophy that you receive when you give a talk on one
          of our events.
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <div className="h-[600px] w-full">
          <Canvas>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <OrbitControls enableZoom={false} autoRotate={false} />
              <ThreeScene />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            </Suspense>
          </Canvas>
        </div>
      </SectionContainer>
    </>
  );
}
