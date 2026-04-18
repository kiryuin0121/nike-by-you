"use client";

import GridPlane from "@/components/top/GridPlane";
import Scene from "@/components/top/Scene";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";

const App = () => {
  return (
    <main className={`w-screen h-screen relative`}>
      <Canvas camera={{ position: [0, 0, 6.5], fov: 30 }}>
        <Scene />
        <GridPlane />
      </Canvas>
      {/* <UI/> */}
      <h1
        className={`absolute top-1/2 left-20 -translate-y-1/2 text-stroke font-black text-white text-[13rem] leading-44 tracking-tighter`}
      >
        MAKE BY
        <br />
        YOU
      </h1>
      <Link href={"/customize"}>
        <button
          className={`cursor-pointer absolute bottom-40 right-40 w-48 text-center p-4 border-2 rounded-3xl font-semibold text-black bg-white text-xl`}
        >
          Customize
        </button>
      </Link>
    </main>
  );
};

export default App;
