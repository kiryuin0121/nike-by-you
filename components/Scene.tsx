"use client";

import {
  MeshReflectorMaterial,
  PresentationControls,
  Stage,
} from "@react-three/drei";
import Chair from "./Chair";

const Scene = () => {
  return (
    <>
      <color attach="background" args={["#101010"]} />
      <fog attach="fog" args={["#101010", 10, 20]} />

      <PresentationControls
        enabled
        global
        cursor
        snap={false}
        speed={1.5}
        zoom={1}
        rotation={[Math.PI / 8, Math.PI / 4, 0]}
        polar={[0, Math.PI / 3]}
        azimuth={[-Infinity, Infinity]}
      >
        {/* 椅子 */}
        <Stage environment="city" intensity={0.6} shadows adjustCamera={1.5}>
          <Chair/>
        </Stage>
        {/* 床 */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-1}>
          <planeGeometry args={[170, 170]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#101010"
            metalness={0.5}
          />
        </mesh>
      </PresentationControls>
    </>
  );
};

export default Scene;
