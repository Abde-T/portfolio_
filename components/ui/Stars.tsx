import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import * as THREE from "three";

const Stars = (props: any) => {
  const ref = useRef<THREE.Points>(null!);
  const sphere = random.inSphere(new Float32Array(1000), { radius: 1.2 });

  // Throttle framerate
  let elapsed = 0;
  useFrame((state, delta) => {
    elapsed += delta;
    if (elapsed > 1 / 30) {
      // Update at 30 FPS
      if (ref.current) {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
      }
      elapsed = 0;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial transparent color="#ffffff" size={0.005} />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-screen absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          gl={{ preserveDrawingBuffer: false }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(window.devicePixelRatio);
            gl.shadowMap.enabled = false; // Disable shadow maps for performance
          }}
        >
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
        </Canvas>
    </div>
  );
};

export default StarsCanvas;
