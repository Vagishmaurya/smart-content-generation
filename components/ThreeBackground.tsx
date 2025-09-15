import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

function FloatingShape({ position, color, speed, scale }: { position: [number, number, number], color: string, speed: number, scale: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    mesh.current.position.y += Math.sin(time * speed) * 0.005;
    mesh.current.rotation.x = Math.sin(time * 0.2) * 0.2;
    mesh.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    mesh.current.rotation.z = Math.sin(time * 0.4) * 0.2;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      {/* Use abstract shapes instead of spheres for more visual interest */}
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.6} 
        metalness={0.3} 
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function Scene({ subject }: { subject: string | null }) {
  const { viewport } = useThree();

  // Define colors based on subject
  const getColor = (subject: string | null) => {
    if (subject === 'biology') return '#2dd4bf';
    if (subject === 'english') return '#a78bfa';
    if (subject === 'physics') return '#f97316';
    return '#3b82f6';
  };

  // Create array of shapes with positions scaled by viewport
  const shapes = [
    { pos: [-viewport.width * 0.3, viewport.height * 0.2, -5], scale: 0.8, speed: 0.5 },
    { pos: [viewport.width * 0.3, -viewport.height * 0.2, -10], scale: 1.2, speed: 0.7 },
    { pos: [viewport.width * 0.1, viewport.height * 0.3, -8], scale: 0.6, speed: 0.4 },
    { pos: [-viewport.width * 0.2, -viewport.height * 0.3, -12], scale: 1.0, speed: 0.6 },
    { pos: [0, 0, -15], scale: 1.5, speed: 0.3 }
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      {shapes.map((shape, i) => (
        <FloatingShape 
          key={i} 
          position={shape.pos as [number, number, number]} 
          color={getColor(subject)} 
          speed={shape.speed} 
          scale={shape.scale} 
        />
      ))}
    </>
  );
}

type ThreeBackgroundProps = {
  subject: string | null;
};

export default function ThreeBackground({ subject }: ThreeBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        style={{ pointerEvents: 'none' }}
      >
        <Scene subject={subject} />
      </Canvas>
    </div>
  );
}
