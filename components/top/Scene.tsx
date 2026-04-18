"use client";

import { CameraControls, Environment, Float } from "@react-three/drei";
import Shoe from "@/components/Shoe";
import { degToRad } from "three/src/math/MathUtils.js";
import { button, useControls } from "leva";
import { useEffect, useRef } from "react";

type CameraPosition = [
  positionX: number,
  positionY: number,
  positionZ: number,
  targetX: number,
  targetY: number,
  targetZ: number,
];
const CAMERA_POSITIONS: CameraPosition = [
  1.759828612099383, 3.258604001688167, 1.7089495484948576, 0.36902700296508595,
  0.2266767796899593, -0.4985576892137052,
];

const Scene = () => {
  // const controls = useRef<CameraControls>(null);
  const shoesRef = useRef(null!);
  const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } =
    useControls("Shoe", {
      positionX: { value:0.92, min: -2, max: 2, step: 0.01 },
      positionY: { value: -0.01, min: -2, max: 2, step: 0.01 },
      positionZ: { value: 2, min: -2, max: 2, step: 0.01 },
      rotationX: { value: 24, min: -180, max: 180, step: 1 },
      rotationY: { value: -36, min: -180, max: 180, step: 1 },
      rotationZ: { value: -38, min: -180, max: 180, step: 1 },
    });

  // useControls("settings", {
  //   smoothTime: {
  //     value: 0.35,
  //     min: 0.1,
  //     max: 2,
  //     step: 0.1,
  //     onChange: (v) => (controls.current.smoothTime = v),
  //   },
  // });
  // useControls("dolly", {
  //   in: button(() => {
  //     controls.current.dolly(1, true);
  //   }),
  //   out: button(() => {
  //     controls.current.dolly(-1, true);
  //   }),
  // });
  // useControls("truck", {
  //   up: button(() => {
  //     controls.current.truck(0, -0.1, true);
  //   }),
  //   left: button(() => {
  //     controls.current.truck(-0.1, 0, true);
  //   }),
  //   down: button(() => {
  //     controls.current.truck(0, 0.1, true);
  //   }),
  //   right: button(() => {
  //     controls.current.truck(0.1, 0, true);
  //   }),
  // });
  // useControls("rotate", {
  //   up: button(() => {
  //     controls.current.rotate(0, -0.5, true);
  //   }),
  //   down: button(() => {
  //     controls.current.rotate(0, 0.5, true);
  //   }),
  //   left: button(() => {
  //     controls.current.rotate(-0.5, 0, true);
  //   }),
  //   right: button(() => {
  //     controls.current.rotate(0.5, 0, true);
  //   }),
  // });
  // useControls("Helper", {
  //   getLookAt: button(() => {
  //     const position = controls.current.getPosition();
  //     const target = controls.current.getTarget();
  //     console.log([...position, ...target]);
  //   }),
  // });

  // useEffect(() => {
  //   if (!controls.current) return;
  //   controls.current.setLookAt(...CAMERA_POSITIONS, true);
  // }, []);

  return (
    <>
      <color attach="background" args={["#f5f5f5"]} />
      <Environment preset="studio" environmentIntensity={0.5} />
      {/* <CameraControls ref={controls} /> */}
      <group
        ref={shoesRef}
        position={[positionX, positionY, positionZ]}
        rotation={[
          degToRad(rotationX),
          degToRad(rotationY),
          degToRad(rotationZ),
        ]}
      >
        {/* <Float> */}

        <Shoe />
        {/* </Float> */}
      </group>
    </>
  );
};

export default Scene;
