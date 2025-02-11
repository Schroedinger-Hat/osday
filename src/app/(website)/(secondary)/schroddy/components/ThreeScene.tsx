"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";
import { MeshPhongMaterial } from "three";
import { Center } from "@react-three/drei";

export default function ThreeScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const stlGeometry = useLoader(STLLoader, "/schroddy/trophy2024.stl");

  // Rotate the model on each frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5; // Adjust rotation speed here
    }
  });

  return (
    <Center>
      <mesh ref={meshRef} geometry={stlGeometry}>
        <meshPhongMaterial color="#eb4634" specular="#ccccff" shininess={100} />
      </mesh>
    </Center>
  );
}
