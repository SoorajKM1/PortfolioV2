'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// Skills section
const skills = [
  "Python", "C", "Java", "Haskell", "SQL", 
  "QRadar", "Wireshark", "Linux", "Git", "React", 
  "ELM", "Pandas", "NumPy", "Metasploit", "HTML/CSS"
];

function Word({ children, ...props }: { children: string; position: THREE.Vector3 }) {
  return (
    <Text
      color="#67e8f9" 
      fontSize={1.2}  
      fontWeight={700} 
      {...props}
    >
      {children}
    </Text>
  );
}

function Cloud({ count = 4, radius = 20 }) {
  // Create a spherical distribution of words
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    
    for (let i = 1; i < count + 1; i++) 
      for (let j = 0; j < count; j++) 
        temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), skills[(i * j) % skills.length]]);
    return temp;
  }, [count, radius]);
  
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
      // Rotate the whole group slowly
      groupRef.current.rotation.y += delta * 0.1;
  })

  return (
    <group ref={groupRef}>
      {words.map(([pos, word], index) => (
        // @ts-ignore
        <Word key={index} position={pos as THREE.Vector3} children={word as string} />
      ))}
    </group>
  )
}

export default function SkillsScene() {
  return (
    <div className="h-[500px] w-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 35], fov: 90 }}>
        <fog attach="fog" args={['#020617', 0, 80]} />
        <Cloud count={4} radius={18} />
      </Canvas>
    </div>
  );
}