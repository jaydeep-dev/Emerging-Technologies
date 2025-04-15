import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './ThreeDBackground.css'; // Import the CSS file for styles

const SPIN = 0.00001;

const FireFlies = () => {
  const pointsRef1 = useRef();
  const pointsRef2 = useRef();
  const pointsRef3 = useRef();
  const particles = new Float32Array(500).map(() => THREE.MathUtils.randFloatSpread(200)); // Generate random positions

  useFrame(() => {
    if (pointsRef1.current) {
      pointsRef1.current.rotation.x -= SPIN * THREE.MathUtils.randFloat(2.0, 4.0); // Slowly rotate the snowfield
    }
    if (pointsRef2.current) {
      pointsRef2.current.rotation.y -= SPIN * THREE.MathUtils.randFloat(3.0, 7.0); // Slowly rotate the snowfield
    }
    if (pointsRef3.current) {
      pointsRef3.current.rotation.z -= SPIN * THREE.MathUtils.randFloat(2.0, 6.0); // Slowly rotate the snowfield
    }
  });

  return (
    <>
      <Points ref={pointsRef1} positions={particles} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#FFD93D"
          size={1.0}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>

      <Points ref={pointsRef2} positions={particles} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#FF8400"
          size={1.0}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>

      <Points ref={pointsRef3} positions={particles} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#4F200D"
          size={1.0}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </>
  );
};

const ThreeDBackground = () => {
  return (
    <div className="canvas-container">
      <Canvas>
        <FireFlies />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;