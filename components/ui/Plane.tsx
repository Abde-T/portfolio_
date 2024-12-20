import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {  useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Plane = () => {
  const { scene } = useGLTF("./plane/scene.gltf");

  const planeRef = useRef<THREE.Object3D | null>(null);
  const propeller1Ref = useRef<THREE.Object3D | null>(null);

  const radiusX = 5; // Radius along the X-axis (horizontal stretch)
  const radiusY = 1.5; // Radius along the Y-axis (vertical stretch)
  const radiusZ = 1.5; // Radius along the Y-axis (vertical stretch)
  const speed = 0.01; // Speed of the animation
  const centerX = 0; // Center of the circle along the X-axis
  const centerY = 0; // Center of the circle along the Y-axis
  const centerZ = 0;
  let time = 0; // Time variable to control the animation

  useFrame(() => {
    if (planeRef.current) {
      // Skewed circular path: Stretch horizontally (radiusX) and vertically (radiusY)
      const x = centerX + radiusX * Math.sin(time); // X position for the skewed circle
      const y = centerY + radiusY * Math.cos(time); // Y position for the skewed circle
      const z = centerZ + radiusZ * Math.cos(time); // Y position for the skewed circle
      // Apply new position to the plane
      planeRef.current.position.set(x, y, z);
      planeRef.current.rotation.set(
        THREE.MathUtils.degToRad(10),
        centerY + radiusY * Math.cos(time),
        centerZ + radiusZ * Math.sin(time)
      );

      // Rotate the propellers
      if (propeller1Ref.current) propeller1Ref.current.rotation.z += 0.2;

      // Increment the time for smooth animation
      time += speed; // Adjust the speed for faster or slower movement
      // Loop the animation by resetting the time when a full cycle is completed
      if (time >= Math.PI * 2) {
        time = 0; // Reset time to restart the loop
      }
    }
  });
  //   // Set the propeller to rotate
  React.useEffect(() => {
    const propeller1 = scene.getObjectByName("polySurface406_Tooner_0");
    const propeller2 = scene.getObjectByName(
      "polySurface306_pasted__lambert2_0"
    );
    const propeller3 = scene.getObjectByName(
      "polySurface305_pasted__lambert2_0"
    );
    const propeller4 = scene.getObjectByName(
      "polySurface304_pasted__lambert2_0"
    );

    if (propeller1) propeller1Ref.current = propeller1;
    if (propeller2) propeller2.visible = false;
    if (propeller3) propeller3.visible = false;
    if (propeller4) propeller4.visible = false;
  }, [scene]);

  return (
    <primitive
      ref={planeRef}
      object={scene}
      scale={1}
      position={[0, 0, -2]}
      rotation={[0, 3.5, 5]}
    />
  );
};

const PlaneCanvas = () => {
  return (
    <div className="w-full h-screen absolute inset-0 z-0">
      <Canvas dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
        <ambientLight intensity={1.4} /> {/* Soft global light */}
        <directionalLight position={[10, 10, 5]} intensity={5} />{" "}
        {/* Main light */}
        <spotLight
          position={[15, 20, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <React.Suspense fallback={null}>
          <Plane />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default PlaneCanvas;
