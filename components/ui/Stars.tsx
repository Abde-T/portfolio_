import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";

const Stars = (props:any, { isPaused }: { isPaused: boolean }) => {
  const ref = useRef<THREE.Points>(null!);
  const sphere = random.inSphere(new Float32Array(1000), { radius: 1.2 });

  // Throttle framerate
  let elapsed = 0;
  useFrame((state, delta) => {
    if (isPaused) return; // Stop updating if out of view

    elapsed += delta;
    if (elapsed > 1 / 30) {
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
  const { ref, inView } = useInView({
    triggerOnce: false, // Re-mount when it enters the viewport
    threshold: 0.01, // Trigger when 10% of it is visible
  });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsPaused(!inView); // Pause updates when not in view
  }, [inView]);

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
        <Suspense fallback={<></>}>
          <Stars isPaused={isPaused} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
