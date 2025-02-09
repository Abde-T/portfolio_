"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Earth component to load and display the 3D model
const Earth = () => {
  const { scene } = useGLTF("/planet/scene.gltf"); // Make sure the model is inside the public folder

  return (
    <primitive
      object={scene}
      scale={2}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

const GridGlobe = () => {
  return (
    <div className="flex items-center justify-center absolute -left-5 top-36 md:top-40 w-full h-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-96 px-4">
        <div className="absolute w-full h-72 md:h-full z-10">
          {/* 3D Canvas */}
          <Canvas
            dpr={[1, 2]} // Handle device pixel ratio for high DPI screens
            gl={{ preserveDrawingBuffer: true }} // Ensure the buffer is preserved for screenshots
            shadows // Enable shadows for better lighting effects
            camera={{ position: [0, 0, 5], fov: 50 }} // Set a better camera position for visibility
          >
            <OrbitControls autoRotate enableZoom={false} />
            <Suspense fallback={<></>}>
              <Earth />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default GridGlobe;
