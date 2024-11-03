"use client";

import { useCommonStore } from "@/app/stores/commonStore";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

const CursorDefault = () => {
  const { cursor } = useCommonStore();

  return (
    cursor === "default" && (
      <motion.div className="w-[20px] h-[20px] bg-[#dbdbdb] rounded-[50%]" />
    )
  );
};

const CursorHelp = () => {
  const { cursor } = useCommonStore();

  return (
    cursor === "helper" && (
      <motion.div
        className="rounded-full p-4 text-xl text-background bg-primary text-nowrap overflow-hidden"
        initial={{ width: 80, x: 20, y: -20 }}
        animate={{ width: "auto" }}
        exit={{ width: 80 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        You can call me Khang :D
      </motion.div>
    )
  );
};

const Cursor = () => {
  const { cursor } = useCommonStore();

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", (e) => {
      const baseCursor = document.getElementById("cursor");
      if (!baseCursor) return;
      baseCursor.style.left = `${e.clientX - 10}px`;
      baseCursor.style.top = `${e.clientY - 10}px`;
    });
  }

  return (
    <AnimatePresence>
      <motion.div
        id="cursor"
        className={clsx(
          "fixed top-[-5px] left-[-5px] z-[999] pointer-events-none",
          cursor === "default" && "mix-blend-difference"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CursorDefault key="default" />
        <CursorHelp key="helper" />
      </motion.div>
    </AnimatePresence>
  );
};

export default Cursor;
