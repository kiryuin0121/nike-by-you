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
    2.4375784385659354, 3.4344993184155546, -0.24850566973233193,
    0.3345722331678403, 0.037258273242430896, -0.43855350857333303,
  ],
  stripes: [
    -1.0447545089294192, 0.3821634269694562, 3.5257085425279797,
    -0.37963984647558594, 0.09967375182466737, 0.10111775394819472,
  ],

  laces: [
    1.463064227723461, 3.780948097218955, -0.39276120272977183,
    -0.35547856768959174, -0.33355087812404527, -0.5102358091461356,
  ],
  caps: [
    0.2025132916463906, 2.5175816337823824, -2.4999186667337754,
    -0.2239785465434586, -0.04813913870845084, -1.004866283181117,
  ],
  band: [
    3.9592609762006483, 1.045321301813328, -0.13666743066539194,
    -0.44031475622814636, 0.162853602754717, -0.47576053696784215,
  ],
  inner: [
    -0.5399123241791602, 4.662853702752467, -0.4846725820200423,
    -0.5399168108723018, 0.16285370275471685, -0.48467292783018495,
  ],
  sole: [
    -1.7603383972140638, 0.043123949025208164, 3.276812949369593,
    -0.42923374015349514, 0.16524999460044227, -0.4932328886732085,
  ],
  patch: [
    -4.242382947021561, 1.4507781356604974, -0.6824693141131933,
    -0.5266850682982719, -0.016705097148172005, -0.4822638309798106,
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
      controls.current.dolly(0.5, true);
    }),
    out: button(() => {
      controls.current.dolly(-0.5, true);
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
    const isCustomizing = slideNum !== -1;
    const cameraPosition: CameraPosition = isCustomizing
      ? CAMERA_POSITIONS[SHOE_PARTS[slideNum]]
      : [
          3.1957236381604206, 3.4826551171737727, -3.0384832459845974,
          0.42862287966006013, 0.5277933916825744, -0.10387158930259044,
        ];
    controls.current.setLookAt(...cameraPosition, isCustomizing);
  }, [slideNum]);

  return (
    <>
      <Environment preset="studio" environmentIntensity={0.4} />
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
