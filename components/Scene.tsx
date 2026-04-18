"use client";

import { CameraControls, Environment } from "@react-three/drei";
import Shoe from "./Shoe";
import { degToRad } from "three/src/math/MathUtils.js";
import { button, useControls } from "leva";
import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { SHOE_PARTS, slideNumAtom } from "@/atoms/slide";
import { ShoePart } from "@/atoms/shoe";
type CameraPosition = [
  positionX: number,
  positionY: number,
  positionZ: number,
  targetX: number,
  targetY: number,
  targetZ: number,
];
const CAMERA_POSITIONS: Record<ShoePart, CameraPosition> = {
  mesh: [
    2.7022396661229067, 2.532310540713748, 1.6584295143418228,
    0.07858085358541939, 0.16285360275471705, -0.21295720532683005,
  ],

  stripes: [
    -0.06671579365718161, 1.8065474105786572, 1.7581921169182795,
    -0.39514228934592904, -6.938893903907227e-19, 0.06157121339823946,
  ],
  laces: [
    2.243626843655962, 3.6655998412900592, -0.3843049062329693,
    -0.34916938244063617, -0.00891274206588211, -0.5435688528689998,
  ],

  caps: [
    0.6692116418338271, 2.2073053933191003, -0.029017240961023205,
    -0.14682735198429797, 0.01135412501449613, -0.9018736941076456,
  ],

  inner: [
    -0.5432068314418825, 3.5132023808008537, -0.5588963534508341,
    -0.5432103180997335, 0.013202380802603908, -0.5588966587654758,
  ],

  sole: [
    -1.1425503030372783, -0.2965408083420755, 2.403693476846791,
    -0.43540364723245706, 0.16285360275471705, -0.4753515700805915,
  ],

  band: [
    1.3004513683713361, 2.5794647384441425, 0.07057663106206309,
    -0.4710532106812541, 0.162853602754717, -0.07694335150834596,
  ],

  patch: [
    -4.045042719407935, 1.8771020553614406, -0.6935785441011123,
    -0.481652171830789, 0.07254019861431256, -0.4795591276660227,
  ],
};
const Scene = () => {
  const controls = useRef<CameraControls>(null);
  const shoesRef = useRef(null!);
  const slideNum = useAtomValue(slideNumAtom);
  const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } =
    useControls("Shoe", {
      positionX: { value: -0.3, min: -2, max: 2, step: 0.01 },
      positionY: { value: 0.52, min: -2, max: 2, step: 0.01 },
      positionZ: { value: 0, min: -2, max: 2, step: 0.01 },
      rotationX: { value: 0, min: -180, max: 180, step: 1 },
      rotationY: { value: 0, min: -180, max: 180, step: 1 },
      rotationZ: { value: 0, min: -180, max: 180, step: 1 },
    });

  useControls("settings", {
    smoothTime: {
      value: 0.35,
      min: 0.1,
      max: 2,
      step: 0.1,
      onChange: (v) => (controls.current.smoothTime = v),
    },
  });
  useControls("dolly", {
    in: button(() => {
      controls.current.dolly(1, true);
    }),
    out: button(() => {
      controls.current.dolly(-1, true);
    }),
  });
  useControls("truck", {
    up: button(() => {
      controls.current.truck(0, -0.1, true);
    }),
    left: button(() => {
      controls.current.truck(-0.1, 0, true);
    }),
    down: button(() => {
      controls.current.truck(0, 0.1, true);
    }),
    right: button(() => {
      controls.current.truck(0.1, 0, true);
    }),
  });
  useControls("rotate", {
    up: button(() => {
      controls.current.rotate(0, -0.5, true);
    }),
    down: button(() => {
      controls.current.rotate(0, 0.5, true);
    }),
    left: button(() => {
      controls.current.rotate(-0.5, 0, true);
    }),
    right: button(() => {
      controls.current.rotate(0.5, 0, true);
    }),
  });
  useControls("Helper", {
    getLookAt: button(() => {
      const position = controls.current.getPosition();
      const target = controls.current.getTarget();
      console.log([...position, ...target]);
    }),
  });

  useEffect(() => {
    if (!controls.current) return;
    controls.current.setLookAt(...CAMERA_POSITIONS.mesh, true);
  }, []);
  useEffect(() => {
    if (!controls.current) return;
    controls.current.setLookAt(...CAMERA_POSITIONS[SHOE_PARTS[slideNum]], true);
  }, [slideNum]);

  return (
    <>
      <color attach="background" args={["#f5f5f5"]} />
      <Environment preset="studio" environmentIntensity={0.2} />
      <CameraControls ref={controls} />
      <group
        ref={shoesRef}
        position={[positionX, positionY, positionZ]}
        rotation={[
          degToRad(rotationX),
          degToRad(rotationY),
          degToRad(rotationZ),
        ]}
      >
        <Shoe />
        <Shoe position={[0.1, 0, -0.9]} />
      </group>
    </>
  );
};

export default Scene;
