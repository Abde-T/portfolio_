import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import * as THREE from "three";

const Stars = (props:any) => {
  const ref = useRef<THREE.Points>(null!);
  const sphere = random.inSphere(new Float32Array(2011), { radius: 1.2 });

  useFrame((state, delta) => {
   if (ref.current) {
     ref.current.rotation.x -= delta / 10;
     ref.current.rotation.y -= delta / 15;
   }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial transparent color="#ffffff" size={0.003} />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-screen absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
