"use client";

import Scene from "@/components/Scene";
import UI from "@/components/UI";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

const App = () => {
  return (
    <main className={`w-screen h-screen relative bg-grid`} >
      <Leva hidden/>
      <Canvas camera={{position:[0,0,6.5],fov:30}}>
        <Scene/>
      </Canvas>
      <UI/>
    </main>
  )
}

export default App;