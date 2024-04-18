import React, { FC, Suspense, useRef } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useFrame, useLoader } from '@react-three/fiber';
import { Center, Edges } from '@react-three/drei';

const ThreeScene: FC = () => {
    const stl = useLoader(STLLoader, [
        "trophy2024.stl",
    ]);
    const group = useRef<any>(null!);
    const materialProps = {
        name: undefined,
        color: '#e60309',
        opacity: 1,
        visible: true,
    };

    useFrame(() => {
        group.current.rotation.z -= 0.005;
      });

    return (
        <Suspense fallback={'loader..'}>
            <Center>
                <group rotation={[-1, 0, 0]} ref={group}>
                    <mesh scale={5} castShadow receiveShadow>
                        <primitive attach="geometry" object={stl[0]}></primitive>
                        <meshStandardMaterial {...materialProps} transparent />
                    </mesh>
                </group>
            </Center>
        </Suspense>
    );
};

export default ThreeScene;