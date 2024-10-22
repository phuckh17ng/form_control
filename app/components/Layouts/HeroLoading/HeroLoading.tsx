"use client";

import clsx from "clsx";
import { cubicBezier, motion, useAnimation } from "framer-motion";
import { useState } from "react";
type Props = {
  setIsEnter: (a: boolean) => void;
};

const HeroLoading = (props: Props) => {
  const { setIsEnter } = props;
  const loadingControls = useAnimation();
  const buttonControls = useAnimation();
  const div1Controls = useAnimation();
  const div2Controls = useAnimation();
  const textControls = useAnimation();
  const [isSoundOn, setSoundOn] = useState(true);
  const motionVariants = {
    buttonInitial: { width: "fit-content" },
    button: {
      width: "100%",
      color: "rgb(var(--color-text)/0)!important",
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
              setSoundOn(true);
            }}
          >
            On
          </span>{" "}
          /
          <span
            className={clsx(
              isSoundOn
                ? "cursor-pointer hover:text-primary/40 transition-colors"
                : "text-primary/40 cursor-default"
            )}
            onClick={() => setSoundOn(false)}
          >
            Off
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroLoading;
