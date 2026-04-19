// "use client";

import {
  setShoePartColorAtom,
  setShoePartTextureAtom,
  shoeConfigAtom,
  ShoePart,
} from "@/atoms/shoe";
import {
  nextSlideAtom,
  prevSlideAtom,
  SHOE_PARTS,
  slideNumAtom,
} from "@/atoms/slide";
import { useAtomValue, useSetAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";

const SHOE_PART_LABEL = {
  laces: "Laces",
  mesh: "Upper",
  stripes: "Stripes",
  caps: "Eyelets",
  inner: "Inner",
  sole: "Midsole",
  band: "Tongue",
  patch: "Heel Tab",
};

const COLORS = [
  { label: "Off White", code: "#f8fafc" },
  { label: "Light Gray", code: "#e5e7eb" },
  { label: "Medium Gray", code: "#9ca3af" },
  { label: "Dark Gray", code: "#4b5563" },
  { label: "Charcoal", code: "#1f2937" },

  { label: "Soft Red", code: "#d26464" },
  { label: "Rose", code: "#d97782" },

  { label: "Amber", code: "#d4a373" },
  { label: "Gold", code: "#c9a227" },
  { label: "Sand", code: "#e6c79c" },

  { label: "Sage", code: "#8da88b" },
  { label: "Olive", code: "#7c8f4e" },
  { label: "Forest", code: "#3f6f5a" },

  { label: "Steel Blue", code: "#5a7d9a" },
  { label: "Slate Blue", code: "#4c6a92" },
  { label: "Deep Blue", code: "#2f4f6f" },

  { label: "Mauve", code: "#9a7aa0" },
  { label: "Dusty Purple", code: "#7e6a8c" },

  { label: "Dusty Pink", code: "#c08090" },
  { label: "Salmon", code: "#d98c7a" },

  { label: "Camel", code: "#b08968" },
  { label: "Walnut", code: "#6f4e37" },
  { label: "Dark Brown", code: "#4b3621" },
];

const INK = "#111118";

const spring = { type: "spring", stiffness: 520, damping: 36 } as const;
const snappy = { duration: 0.12, ease: "easeOut" } as const;

const UI = () => {
  const shoeConfig         = useAtomValue(shoeConfigAtom);
  const setShoePartColor   = useSetAtom(setShoePartColorAtom);
  const slideNum           = useAtomValue(slideNumAtom);
  const nextSlide          = useSetAtom(nextSlideAtom);
  const prevSlide          = useSetAtom(prevSlideAtom);
  const setShoePartTexture = useSetAtom(setShoePartTextureAtom);

  const isCustomizing = slideNum !== -1;
  const currentPart   = isCustomizing ? SHOE_PARTS[slideNum] : null;
  const isLeather     = currentPart ? shoeConfig[currentPart].texture === "leather" : null;
  const currentColor  = currentPart ? shoeConfig[currentPart].color : null;
  const selectedLabel = COLORS.find((c) => c.code === currentColor)?.label ?? "";

  return (
    <div className={`absolute inset-0 z-10 w-screen h-screen pointer-events-none`}>
      <AnimatePresence mode="wait">

        {isCustomizing && currentPart ? (
          <motion.div
            key="customizing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={snappy}
            className={`absolute inset-0`}
          >
            {/* 商品名・価格 */}
            <section className={`absolute top-20 left-20`}>
              <h1
                className={`text-xl`}
                style={{ color: INK, textShadow: "0 0 16px #fff, 0 0 8px #fff" }}
              >
                AJIZERO JAPAN
              </h1>
              <p
                className={`text-lg`}
                style={{ color: INK, textShadow: "0 0 16px #fff, 0 0 8px #fff" }}
              >
                ¥2026,0418
              </p>
            </section>

            {/* ボトムパネル */}
            <motion.section
              initial={{ y: 56, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 56, opacity: 0 }}
              transition={{ ...spring, delay: 0.04 }}
              className={`absolute bottom-0 left-0 pointer-events-auto w-screen bg-white/75 backdrop-blur-md border-t border-neutral-200/70`}
              style={{ boxShadow: "0 -4px 28px rgba(17,17,24,0.08)" }}
            >

              {/* パーツ名ナビゲーション */}
              <div className={`flex justify-center items-center gap-2 pt-5 pb-2`}>
                <motion.button
                  whileTap={{ scale: 0.84 }}
                  transition={spring}
                  onClick={prevSlide}
                  className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 `}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={2.2} stroke={INK} className={`w-3.5 h-3.5`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </motion.button>

                <div className={`min-w-32 text-center`}>
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={currentPart}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={snappy}
                      className={`text-base  tracking-tight`}
                      style={{ color: INK }}
                    >
                      {SHOE_PART_LABEL[currentPart]}
                    </motion.h2>
                  </AnimatePresence>
                </div>

                <motion.button
                  whileTap={{ scale: 0.84 }}
                  transition={spring}
                  onClick={nextSlide}
                  className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 `}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={2.2} stroke={INK} className={`w-3.5 h-3.5`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </motion.button>
              </div>

              {/* ステップインジケーター */}
              <div className={`flex justify-center gap-1.5 pb-4`}>
                {SHOE_PARTS.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: i === slideNum ? 18 : 8,
                      opacity: i === slideNum ? 1 : i < slideNum ? 0.45 : 0.2,
                      backgroundColor: INK,
                    }}
                    transition={spring}
                    className={`h-1.5 rounded-full`}
                  />
                ))}
              </div>

              <div className={`mx-6 h-px bg-neutral-100`} />

              {/* テクスチャー切り替え */}
              <div className={`flex justify-center gap-2 pt-3.5 pb-3`}>
                {[
                  { label: "mesh", active: !isLeather, fn: () => setShoePartTexture({ part: currentPart, texture: null }) },
                  { label: "leather",   active:  isLeather, fn: () => setShoePartTexture({ part: currentPart, texture: "leather" }) },
                ].map(({ label, active, fn }) => (
                  <motion.button
                    key={label}
                    onClick={fn}
                    whileTap={{ scale: 0.93 }}
                    transition={spring}
                    className={`relative px-5 py-1.5 rounded text-xs tracking-wide border cursor-pointer overflow-hidden`}
                    style={{ borderColor: active ? INK : "#e5e7eb" }}
                  >
                    {active && (
                      <motion.span
                        layoutId="texture-fill"
                        className={`absolute inset-0 rounded-full`}
                        // style={{ backgroundColor: INK }}
                        transition={spring}
                      />
                    )}
                    <span className={`relative z-10`}>{label}</span>
                  </motion.button>
                ))}
              </div>

              {/* カラースウォッチ */}
              <div className={`px-8 pb-7`}>
                {/* 選択中カラー名 — 固定高さでレイアウトシフトなし */}
                <div className={`flex justify-center mb-3 h-4`}>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={selectedLabel}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className={`text-[11px] tracking-widest text-neutral-400`}
                    >
                      {selectedLabel}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <ul className={`flex gap-[18px] justify-center items-center`}>
                  {COLORS.map((color) => {
                    const isSelected = currentColor === color.code;
                    return (
                      <li key={color.code}>
                        <motion.button
                          onClick={() => setShoePartColor({ part: currentPart, color: color.code })}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={spring}
                          className={`cursor-pointer relative w-7 h-7 rounded-full`}
                          style={{
                            backgroundColor: color.code,
                            boxShadow:
                              color.code === "#ffffff"
                                ? "inset 0 0 0 1px #d1d5db"
                                : "0 1px 5px rgba(17,17,24,0.20)",
                          }}
                        >
                
                          <AnimatePresence>
                            {isSelected && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className={`absolute -inset-[5px] rounded-full border-[2px] pointer-events-none`}
                                style={{
                                  borderColor:
                                    color.code === "#ffffff" ? INK : color.code,
                                }}
                              />
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.section>
          </motion.div>

        ) : (
          /* ランディング画面 */
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={snappy}
            className={`absolute inset-0`}
          >
            <h1
              className={`absolute top-1/2 left-20 -translate-y-1/2 text-stroke font-black text-white text-[13rem] leading-44 tracking-tighter`}
            >
              MAKE BY
              <br />
              YOU
            </h1>

            <motion.button
              onClick={nextSlide}
              // whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={spring}
              className={`pointer-events-auto cursor-pointer absolute bottom-40 right-40 w-48 text-center p-4 border-2 rounded font-semibold bg-white text-xl`}
              style={{ color: INK }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
Customize
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default UI;