import { shaderMaterial } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Color, Vector2 } from "three";

const COLS = 17;
const ROWS = 11;

const GridMaterial = shaderMaterial(
  {
    uGridSize: new Vector2(COLS, ROWS),
    uColorBg: new Color("#ffffff"),
    uColorLine: new Color("#000000"),
    uLineWidth: 0.02,
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    varying vec2 vUv;
    uniform vec2 uGridSize;
    uniform vec3 uColorBg;
    uniform vec3 uColorLine;
    uniform float uLineWidth;

    void main() {
      vec2 cell = fract(vUv * uGridSize);
      vec2 d = min(cell, 1.0 - cell);
      float onLine = clamp(step(d.x, uLineWidth) + step(d.y, uLineWidth), 0.0, 1.0);
      gl_FragColor = vec4(mix(uColorBg, uColorLine, onLine), 1.0);
    }
  `
);

extend({ GridMaterial });

const GridPlane = () => {
  const { viewport } = useThree();
  const matRef = useRef(null);

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <gridMaterial ref={matRef} />
    </mesh>
  );
};

export default GridPlane;