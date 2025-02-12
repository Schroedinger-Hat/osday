"use client";

import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { TypewriterText } from "~/components/atoms/typography/TypewriterText";
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { ThreeScene } from "./components/ThreeScene";

const SPECS_TEXT = `Codename: schroddy.stl
Material: Polylactic Acid
Vertices: 27'0120
Faces: 54'000
Polygons: 53'998
Usage: Personal Trophy, Desktop Ornament, Paperweight, or Highly Ineffective Boomerang

Thermal Resistance: 200°C with strong moral support
Weight: 100g ± 0.1g
Dimensions: 120mm x 85mm x 65mm
Layer Height: 0.2mm
Infill Density: 15%, voids add character

Print Time: Approximately 4 coffee breaks
Support: None, unless gravity decides otherwise
Post-processing: Admire, Polish, Worship
Manufacturing Tolerances: Precise enough to impress, but not enough to rival aerospace engineering

Vibrational Frequency: Classified
Radioactive Emissions: Not great not terrible
Quantum Entanglement Potential: Currently untested
Structural Integrity: Surprisingly solid for something that isn't meant to be thrown`;

export default function SchroddyPage() {
  const [windowState, setWindowState] = useState({
    innerWidth: 1600,
    innerHeight: 900,
  });

  useEffect(() => {
    if (window) {
      setWindowState(window);
    }
  }, []);

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

      <SectionContainer className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            flat
            linear
            className="aspect-square rounded-md bg-gray-300 p-8 shadow-md"
          >
            <Suspense fallback={null}>
              <PerspectiveCamera
                makeDefault
                fov={60}
                aspect={windowState.innerWidth / windowState.innerHeight}
                position={[3, 0.15, 1]}
                near={10}
                far={10000}
                position-z={1050}
              ></PerspectiveCamera>
              <ThreeScene />
              <Environment preset="studio" />
              <ambientLight intensity={0.1} />
            </Suspense>
          </Canvas>
        </div>
        <div className="flex items-center">
          <div className="w-full max-w-full whitespace-pre-wrap break-words font-mono text-sm">
            <TypewriterText text={SPECS_TEXT} />
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
