"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function CoreMesh() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        // Slow rotation
        meshRef.current.rotation.y = time * 0.2;
        meshRef.current.rotation.x = time * 0.1;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere args={[1, 64, 64]} scale={2.5} ref={meshRef}>
                <MeshDistortMaterial
                    color="#FFD700"
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={0.8}
                    roughness={0}
                    distort={0.4} // Liquid metal ripple
                    speed={2} // Ripple speed
                />
            </Sphere>
        </Float>
    );
}

export default function TheCore() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Glow behind the core */}
            <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

            <Canvas camera={{ position: [0, 0, 6] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} color="#a855f7" intensity={1} />
                <pointLight position={[-10, -10, -10]} color="#eab308" intensity={1} />
                <CoreMesh />
            </Canvas>
        </div>
    );
}
