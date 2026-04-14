"use client";

import {
  MeshReflectorMaterial,
  PresentationControls,
  Stage,
} from "@react-three/drei";
import Chair from "./Chair";
import Shoe from "./Shoe";

const Scene = () => {
  return (
    <>
      <color attach="background" args={["#f5f5f5"]} />
      {/* <fog attach="fog" args={["#101010", 10, 20]} /> */}
      <PresentationControls
        enabled
        global
        cursor
        snap={false}
        speed={1.5}
        zoom={1}
        rotation={[Math.PI / 8, Math.PI / 4, 0]}
        polar={[0, Math.PI / 4]}
        azimuth={[-Infinity, Infinity]}
      >
        <Stage environment="city" intensity={0.6} shadows adjustCamera={1.5}>
          <Shoe/>
          <group position={[0.1,0,-0.9]}>
            <Shoe/>
          </group>
        </Stage>
      </PresentationControls>
    </>
  );
};

export default Scene;
