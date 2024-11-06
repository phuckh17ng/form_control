"use client";

import { useCommonStore } from "@/app/stores/commonStore";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const CursorDefault = () => {
  const { cursor } = useCommonStore();

  return useMemo(
    () =>
      cursor === "default" && (
        <motion.div
          layoutId="default"
          className="w-[20px] h-[20px] bg-[#dbdbdb] rounded-[50%]"
        />
      ),
    [cursor]
  );
};

const CursorHelp = () => {
  const { cursor } = useCommonStore();

  return useMemo(
    () =>
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
      ),
    [cursor]
  );
};

const CursorImages = () => {
  const { cursor } = useCommonStore();
  const progressVariants = useMemo(
    () => ({
      initial: { width: 0 },
      animate: {
        width: "100%",
        transition: { duration: 4, repeat: Infinity, repeatDelay: 0.2 },
      },
    }),
    []
  );

  const images = useMemo(
    () => [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
    []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [displayedImage, setDisplayedImage] = useState("/images/image1.png");

  useEffect(() => {
    if (cursor !== "images") return;
    const timeoutId = setTimeout(() => {
      setDisplayedImage(images[currentImageIndex]);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4200);

    return () => clearTimeout(timeoutId);
  }, [currentImageIndex, images, cursor]);

  return useMemo(
    () =>
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
              src={displayedImage}
              className="w-[30rem] max-h-[22.5rem] aspect-auto transition-none object-contain"
              alt="hcm_city"
              width={0}
              height={0}
              translate="no"
              objectFit="contain"
              objectPosition="center"
              layout="fixed"
              loading="lazy"
              unoptimized
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQY..."
              loader={({ src }) => `http://localhost:3000/${src}`}
              // priority
            />

            <p className="font-pacifico text-end text-[#dbdbdb] absolute bottom-3 right-3 text-base">
              phuckh17ng
            </p>
          </div>
          <p className="w-full text-center pt-4 text-xl font-bold">
            A great city with great people ^^
          </p>
        </motion.div>
      ),
    [cursor, displayedImage, progressVariants]
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

  return useMemo(
    () => (
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
    ),
    [cursor]
  );
};

export default Cursor;
