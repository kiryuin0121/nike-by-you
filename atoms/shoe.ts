import { atom } from "jotai";
type ShoePartMaterial = {
  color: string;
};
type ShoePart =
  | "laces"
  | "mesh"
  | "caps"
  | "inner"
  | "sole"
  | "stripes"
  | "band"
  | "patch";
type ShoeConfig = Record<ShoePart,ShoePartMaterial>;
export const shoeConfigAtom = atom<ShoeConfig>({
  laces: { color: "white" },
  mesh: { color: "white" },
  caps: { color: "white" },
  inner: { color: "white" },
  sole: { color: "white" },
  stripes: { color: "white" },
  band: { color: "white" },
  patch: { color: "white" },
});
export const setShoePartColorAtom = atom(null,(get,set,update:{part:ShoePart,color:string}) => {
  const {part,color} = update;
  const shoeConfig= get(shoeConfigAtom);
  set(shoeConfigAtom,{...shoeConfig,[part]:{...shoeConfig[part],color}});
});
