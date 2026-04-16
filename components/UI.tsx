"use client";

import { setShoePartColorAtom, shoeConfigAtom, ShoePart } from "@/atoms/shoe";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";

const SHOE_PARTS: ShoePart[] = [
  "mesh",
  "stripes",
  "laces",
  "caps",
  "inner",
  "sole",
  "band",
  "patch",
];
const SHOE_PART_LABEL: Record<ShoePart, string> = {
  laces: "シューレース",
  mesh: "アッパー",
  stripes: "ストライプ",
  caps: "シューホール",
  inner: "インナー",
  sole: "ミッドソール",
  band: "シュータン",
  patch: "バックタブ",
};
const COLORS = [
  { label: "ホワイト", code: "#ffffff" },
  { label: "ブラック", code: "#000000" },
  { label: "グレー", code: "#d1d5db" },
  { label: "レッド", code: "#ef4444" },
  { label: "オレンジ", code: "#f97316" },
  { label: "イエロー", code: "#eab308" },
  { label: "グリーン", code: "#22c55e" },
  { label: "シアン", code: "#06b6d4" },
  { label: "ブルー", code: "#3b82f6" },
  { label: "インディゴ", code: "#6366f1" },
  { label: "パープル", code: "#a855f7" },
  { label: "ピンク", code: "#ec4899" },
];
const UI = () => {
  const shoeConfig = useAtomValue(shoeConfigAtom);
  const setShoePartColor = useSetAtom(setShoePartColorAtom);
  const [slideNum, setSlideNum] = useState(0);
  return (
    <div
      className={`absolute inset-0 z-10 w-screen h-screen pointer-events-none`}
    >
      <section
        className={`absolute bottom-0 left-0 pointer-events-auto w-screen min-h-1/4 bg-neutral-100 space-y-8`}
      >
        <div className={`flex justify-center items-center gap-x-4 text-lg`}>
          <button
            className={`cursor-pointer`}
            onClick={() =>
              setSlideNum((slideNum) =>
                slideNum === 0 ? SHOE_PARTS.length - 1 : slideNum - 1,
              )
            }
          >
            ←
          </button>
          <div className={`flex gap-x-2`}>

          <h2>{SHOE_PART_LABEL[SHOE_PARTS[slideNum]]}</h2>
          <span className={`text-neutral-500`}>{slideNum+1}/{SHOE_PARTS.length}</span>
          </div>
          <button
            className={`cursor-pointer`}
            onClick={() =>
              setSlideNum((slideNum) => (slideNum + 1) % SHOE_PARTS.length)
            }
          >
            →
          </button>
        </div>

        <ul className={`flex gap-8 justify-center items-center`}>
          {
            COLORS.map((color)=>(
              <li key={color.code}>
                <button
                onClick={() =>
                  setShoePartColor({
                    part: SHOE_PARTS[slideNum],
                    color:color.code,
                  })
                }
                style={{backgroundColor:color.code}}
                className={`h-8 aspect-square rounded-full cursor-pointer`}
                />
                <p className={`text-xs`}>{color.label}</p>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
};

export default UI;
