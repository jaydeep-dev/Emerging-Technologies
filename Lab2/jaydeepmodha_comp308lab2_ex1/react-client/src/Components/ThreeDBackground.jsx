import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './ThreeDBackground.css'; // Import the CSS file for styles

const Snowfall = () => {
  const pointsRef = useRef();
  const particles = new Float32Array(1500 * 3).map(() => THREE.MathUtils.randFloatSpread(200)); // Generate random positions

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= 0.0001; // Slowly rotate the snowfield
      pointsRef.current.rotation.y -= 0.0002; // Slowly rotate the snowfield
      pointsRef.current.rotation.z -= 0.00015; // Slowly rotate the snowfield
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="blue"
        size={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const ThreeDBackground = () => {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        {/* Ambient Light */}
        <ambientLight intensity={0.5} />
        {/* Falling Snow Effect */}
        <Snowfall />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;