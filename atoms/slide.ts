import { atom } from "jotai";
import { ShoePart } from "./shoe";
export const SHOE_PARTS: ShoePart[] = [
  "mesh",
  "stripes",
  "laces",
  "caps",
  "band",
  "inner",
  "sole",
  "patch",
];
export const slideNumAtom = atom<number>(-1);
export const nextSlideAtom = atom(null,(_,set) => {
  set(slideNumAtom,slideNum=>(slideNum+1)%SHOE_PARTS.length);
});
export const prevSlideAtom = atom(null,(_,set) => {
  set(slideNumAtom,slideNum=>(slideNum===0)?(SHOE_PARTS.length-1):(slideNum-1));
})