"use client";

import { useCommonStore } from "@/app/stores/commonStore";
import clsx from "clsx";
import { cubicBezier, motion, useAnimation } from "framer-motion";
import { useState } from "react";

type Props = {
  setIsEnter: (a: boolean) => void;
};

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
  div1Initial: {
    transform: "translateZ(0)",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
  },
  div1: {
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    transition: {
      color: { delay: 0.5 },
      clipPath: {
        delay: 1.7,
        ease: cubicBezier(1, 0.02, 0.31, 1),
        duration: 1.5,
      },
    },
  },
  div2Initial: {
    transform: "translateZ(0)",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
  },
  div2: {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    transition: {
      color: { delay: 0.5 },
      clipPath: {
        delay: 1.7,
        ease: cubicBezier(1, 0.02, 0.31, 1),
        duration: 1.5,
      },
    },
  },
  textInitial: {
    opacity: 1,
  },
  text: {
    opacity: 0,
    transition: {
      delay: 0.7,
      ease: "linear",
    },
  },
};

const HeroLoading = (props: Props) => {
  const { setIsEnter } = props;
  const [isSoundOn, setSoundOn] = useState(true);
  const [isEnterClicked, setEnterClicked] = useState(false);

  const { setLoading, setFristVisit } = useCommonStore();

  const loadingControls = useAnimation();
  const buttonControls = useAnimation();
  const div1Controls = useAnimation();
  const div2Controls = useAnimation();
  const textControls = useAnimation();

  return (
    <motion.div
      animate={loadingControls}
      className="w-screen h-screen flex flex-col justify-center items-center fixed top-0 left-0 z-[9999]"
    >
      <motion.div
        animate={div1Controls}
        variants={motionVariants}
        initial="div1Initial"
        className="bg-background w-full h-1/2 flex items-end justify-center"
      >
        <motion.button
          className="text-xl border-b border-primary font-[500] transition-colors hover:!text-primary/40"
          variants={motionVariants}
          initial="buttonInitial"
          animate={buttonControls}
          onClick={() => {
            if (isEnterClicked) return;
            setEnterClicked(true);
            setLoading();
            buttonControls.start("button");
            div1Controls.start("div1");
            div2Controls.start("div2");
            textControls.start("text");
            setTimeout(() => {
              setIsEnter(true);
              loadingControls.start({
                display: "none",
                transition: { delay: 0.4 },
              });
            }, 2800);
            setTimeout(() => {
              setFristVisit(false);
              setLoading();
            }, 3200);
          }}
        >
          Enter
        </motion.button>
      </motion.div>
      <motion.div
        animate={div2Controls}
        variants={motionVariants}
        initial="div2Initial"
        className="bg-background w-full h-1/2 flex items-start justify-center pt-2"
      >
        <motion.div
          variants={motionVariants}
          animate={textControls}
          initial="textInitial"
          className="flex gap-2 font-[500]"
        >
          Sound
          <span
            className={clsx(
              isSoundOn
                ? "text-primary/40 cursor-default"
                : "cursor-pointer hover:text-primary/40 transition-colors"
            )}
            onClick={() => {
              if (isEnterClicked) return;
              setSoundOn(true);
            }}
          >
            On
          </span>
          /
          <span
            className={clsx(
              isSoundOn
                ? "cursor-pointer hover:text-primary/40 transition-colors"
                : "text-primary/40 cursor-default"
            )}
            onClick={() => {
              if (isEnterClicked) return;
              setSoundOn(false);
            }}
          >
            Off
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroLoading;
