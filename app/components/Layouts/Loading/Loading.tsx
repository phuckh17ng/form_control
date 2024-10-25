"use client";

import { useCommonStore } from "@/app/stores/commonStore";
import { cubicBezier, motion, useAnimation } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export function PreventClickMask() {
  return <div className="fixed top-0 left-0 w-screen h-screen z-[10000]"></div>;
}

const motionVariants = {
  buttonInitial: { width: "fit-content" },
  button: {
    width: "100%",
    color: "rgb(var(--color-text) / 0%)",
    transition: {
      color: {
        delay: 0.7,
        ease: "linear",
      },
      width: {
        ease: cubicBezier(1, 0.02, 0.31, 1),
        duration: 1.5,
      },
    },
  },
  div1OpenInitial: {
    clipPath: "polygon(0 0, 100.5% 0, 100.5% 100.5%, 0% 100.5%)",
  },
  div1OpenAnimate: {
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    transition: {
      color: { delay: 0.5 },
      clipPath: {
        delay: 0.4,
        ease: cubicBezier(1, 0.02, 0.31, 1),
        duration: 1.5,
      },
    },
  },
  div1CloseInitial: {
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
  },
  div1CloseAnimate: {
    clipPath: "polygon(0 0, 100.5% 0, 100.5% 100.5%, 0% 100.5%)",
    transition: {
      color: { delay: 0.5 },
      clipPath: {
        ease: cubicBezier(1, 0.02, 0.31, 1),
        duration: 1,
      },
    },
  },
  div2OpenInitial: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
  },
  div2OpenAnimate: {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    transition: {
      color: { delay: 0.5 },
      clipPath: {
        delay: 0.4,
        ease: cubicBezier(1, 0.02, 0.31, 1),
        duration: 1.5,
      },
    },
  },
  div2CloseInitial: {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
  },
  div2CloseAnimate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    transition: {
      color: { delay: 0.5 },
      clipPath: {
        ease: cubicBezier(1, 0.02, 0.31, 1),
        duration: 1,
      },
    },
  },
};

function TypingText() {
  const cheerTexts = useMemo(
    () => [
      "phuckh17ng",
      "Xin Chào!",
      "Hello!",
      "你好!",
      "Bonjour!",
      "こんにちは!",
      "안녕하세요!",
    ],
    []
  );

  const [currentTextIndex, setCurrentTextIndex] = useState(5);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDisplayedText(cheerTexts[currentTextIndex]);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % cheerTexts.length);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [currentTextIndex, cheerTexts]);

  return displayedText;
}

export function NavigateLoading() {
  const { navigateLoading } = useCommonStore();

  const loadingControls = useAnimation();

  return (
    <motion.div
      animate={loadingControls}
      className="w-screen h-screen flex flex-col justify-center items-center fixed top-0 left-0 z-[9999]"
    >
      <motion.div
        variants={motionVariants}
        animate={
          navigateLoading.animate === "closing"
            ? "div1CloseAnimate"
            : "div1OpenAnimate"
        }
        initial={
          navigateLoading.animate === "closing"
            ? "div1CloseInitial"
            : "div1OpenInitial"
        }
        className="bg-background w-full h-1/2 flex items-end justify-center relative"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={
            navigateLoading.animate === "closing"
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={
            navigateLoading.animate === "closing"
              ? { delay: 1.2, duration: 1, ease: "linear" }
              : { duration: 0.2, ease: "linear" }
          }
          className="text-nowrap font-pacifico text-center text-[20px] absolute w-full bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"
        >
          <TypingText />
        </motion.p>
      </motion.div>
      <motion.div
        variants={motionVariants}
        animate={
          navigateLoading.animate === "closing"
            ? "div2CloseAnimate"
            : "div2OpenAnimate"
        }
        initial={
          navigateLoading.animate === "closing"
            ? "div2CloseInitial"
            : "div2OpenInitial"
        }
        className="bg-background w-full h-1/2 flex items-start justify-center relative"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={
            navigateLoading.animate === "closing"
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={
            navigateLoading.animate === "closing"
              ? { delay: 1.2, duration: 1, ease: "linear" }
              : { duration: 0.2, ease: "linear" }
          }
          className="text-nowrap font-pacifico text-center text-[20px] absolute top-0 -translate-y-1/2 w-full left-1/2 -translate-x-1/2"
        >
          <TypingText />
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
