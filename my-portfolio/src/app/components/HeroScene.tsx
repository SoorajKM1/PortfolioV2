'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Stars } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function CyberArtifact() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    // Continuous rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.25;
    
    // Lerp scale on hover for smooth interaction
    const targetScale = hovered ? 2.8 : 2.5;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh 
        ref={meshRef} 
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        {/* Icosahedron gives a techy, low-poly look */}
        <icosahedronGeometry args={[1, 0]} /> 
        <MeshDistortMaterial
          color={hovered ? "#22d3ee" : "#00f3ff"} // Cyan to lighter cyan
          attach="material"
          distort={0.4}
          speed={2}
          wireframe={true}
          roughness={0}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={['#020617']} /> {/* Match bg-slate-950 */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <CyberArtifact />
      </Canvas>
    </div>
  );
}