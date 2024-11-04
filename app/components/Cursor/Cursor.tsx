"use client";

import { useCommonStore } from "@/app/stores/commonStore";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const CursorDefault = () => {
  const { cursor } = useCommonStore();

  return (
    cursor === "default" && (
      <motion.div
        layoutId="default"
        className="w-[20px] h-[20px] bg-[#dbdbdb] rounded-[50%]"
      />
    )
  );
};

const CursorHelp = () => {
  const { cursor } = useCommonStore();

  return (
    cursor === "helper" && (
      <motion.div
        layoutId="helper"
        className="rounded-full p-4 text-xl text-[#111] bg-[#dbdbdb] text-nowrap overflow-hidden font-bold"
        initial={{ opacity: 0, x: "1.5rem", y: "-2.5rem" }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        You can call me Khang :D
      </motion.div>
    )
  );
};

const CursorImages = () => {
  const { cursor } = useCommonStore();
  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: { duration: 4, repeat: Infinity, repeatDelay: 0.2 },
    },
  };

  const cheerTexts = useMemo(
    () => [
      "/images/my_pic.jpg",
      "/images/my_pic1.jpg",
      "/images/my_pic2.jpg",
      "/images/my_pic3.jpg",
    ],
    []
  );

  const [currentTextIndex, setCurrentTextIndex] = useState(1);
  const [displayedText, setDisplayedText] = useState("/images/my_pic.jpg");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDisplayedText(cheerTexts[currentTextIndex]);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % cheerTexts.length);
    }, 4200);

    return () => clearTimeout(timeoutId);
  }, [currentTextIndex, cheerTexts, cursor]);
  return (
    cursor === "images" && (
      <motion.div
        layoutId="images"
        className="text-xl text-[#111] text-nowrap overflow-hidden p-4 bg-[#dbdbdb] sticky -translate-y-[40%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="absolute bottom-3 left-1/2 text-[#dbdbdb] -translate-x-1/2 bg-[#dbdbdb]/50 w-28 h-4 rounded-full overflow-hidden">
            <motion.div
              variants={progressVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              className="h-full bg-[#dbdbdb]"
            ></motion.div>
          </div>
          <Image
            src={displayedText}
            className="w-[30rem] h-auto"
            alt="hcm_city"
            width={0}
            height={0}
            sizes="100vw"
          />

          <p className="font-pacifico text-end text-[#dbdbdb] absolute bottom-3 right-3 text-base">
            phuckh17ng
          </p>
        </div>
        <p className="w-full text-center pt-4 text-xl font-bold">
          A great city with great people ^^
        </p>
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
      <AnimatePresence>
        <CursorDefault key="default" />
        <CursorHelp key="helper" />
        <CursorImages key="images" />
      </AnimatePresence>
    </motion.div>
  );
};

export default Cursor;
