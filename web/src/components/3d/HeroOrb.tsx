"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Orb() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Rotate slowly
        meshRef.current.rotation.y = time * 0.1;
        meshRef.current.rotation.x = time * 0.05;

        // React to mouse (subtle parallax)
        const { x, y } = state.pointer;
        meshRef.current.rotation.y += x * 0.05;
        meshRef.current.rotation.x += y * 0.05;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={2}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial
                    color="#FFD700"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </Float>
    );
}

export default function HeroOrb() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <Orb />
            </Canvas>
        </div>
    );
}
