'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Stars } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

// 1. New Component: Handles the rotation of the stars
function MovingStars() {
  const ref = useRef<any>();
  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate the stars slightly every frame
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

// 2. Existing Component: The Cyber Artifact
function CyberArtifact() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.25;
    
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
        <icosahedronGeometry args={[1, 0]} /> 
        <MeshDistortMaterial
          color={hovered ? "#22d3ee" : "#00f3ff"}
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

// 3. Main Scene
export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6] }}>
        {/* Note: We removed the <color> tag so this scene is transparent 
            and allows the global background to show through if needed. */}
            
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        
        {/* Use the new MovingStars component */}
        <MovingStars />
        
        <CyberArtifact />
      </Canvas>
    </div>
  );
}