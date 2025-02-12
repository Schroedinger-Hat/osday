"use client";

import { type FC, Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";
import { Center } from "@react-three/drei";

export const ThreeScene: FC = () => {
  const stl = useLoader(STLLoader, ["./assets/trophy2024.stl"]);
  const group = useRef<any>(null!);
  const materialProps = {
    name: undefined,
    color: "#e60309",
    opacity: 1,
    visible: true,
    roughness: 0.7,
    metalness: 0.05,
    clearcoat: 0.05,
    clearcoatRoughness: 0.4,
    envMapIntensity: 0.2,
  };

  useFrame(() => {
    group.current.rotation.z -= 0.005;
  });

  return (
    <Suspense fallback={"loader.."}>
      <Center>
        <group rotation={[-1, 0, 0]} ref={group}>
          <mesh scale={5} castShadow receiveShadow>
            <primitive attach="geometry" object={stl[0]}></primitive>
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
        </group>
      </Center>
    </Suspense>
  );
};
