import React, { FC, Suspense, useRef } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useFrame, useLoader } from '@react-three/fiber';
import { Center, Edges } from '@react-three/drei';

const ThreeScene: FC = () => {
    const stl = useLoader(STLLoader, [
        "schroddy24.stl",
    ]);
    const group = useRef<any>(null!);
    const materialProps = {
        name: undefined,
        color: '#e60309',
        opacity: 1,
        visible: true,
    };

    useFrame(() => {
        group.current.rotation.y -= 0.01;
      });

    return (
        <Suspense fallback={'loader..'}>
            <Center>
                <group rotation={[0.45, 0, 0]} ref={group}>
                    <mesh scale={0.005} castShadow receiveShadow>
                        <primitive attach="geometry" object={stl[0]}></primitive>
                        <meshStandardMaterial {...materialProps} transparent />
                        <Edges visible={false} scale={1.1} renderOrder={1000}>
                        <meshBasicMaterial transparent color="#e0d984" depthTest={false} />
                        </Edges>
                    </mesh>
                </group>
            </Center>
        </Suspense>
    );
};

export default ThreeScene;