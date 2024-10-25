"use client";
import { useCommonStore } from "@/app/stores/commonStore";
import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Header from "../Header";
import HeroLoading from "../HeroLoading";
import { NavigateLoading, PreventClickMask } from "../Loading/Loading";

type Props = {
  children: ReactNode;
  theme: string;
  mode: string;
};

const MainLayout = (props: Props) => {
  const { children, theme, mode } = props;
  const controls = useAnimation();
  const [isEnter, setIsEnter] = useState(false);
  const { isLoading, isFirstVisit, navigateLoading } = useCommonStore();

  const motionVariants = useMemo(
    () => ({
      close: {
        opacity: 0,
        filter: "blur(16px)",
        height: "100vh",
        overflow: "hidden",
        transition: {
          duration: 1.2,
          ease: "easeInOut",
          delay: navigateLoading.animate === "opening" ? 1.2 : 0,
        },
      },
      open: {
        opacity: 1,
        filter: "blur(0)",
        height: "100%",
        transition: {
          duration: 1.2,
          ease: "easeInOut",
          delay: navigateLoading.animate === "opening" ? 1.2 : 0,
        },
      },
    }),
    [navigateLoading.animate]
  );

  useEffect(() => {
    if (isEnter) {
      controls.start("open");
    }
    if (navigateLoading.animate === "opening") {
      controls.start("open");
    }
    if (navigateLoading.animate === "closing") {
      controls.start("close");
    }
  }, [controls, isEnter, navigateLoading.animate]);

  return (
    <>
      {/* Frist Visit Loading Screen*/}
      {isFirstVisit && <HeroLoading setIsEnter={setIsEnter} />}

      {/* Navigate Loading Screen*/}
      {!isFirstVisit && navigateLoading.isNavigating && <NavigateLoading />}

      {/* Loading Mask */}
      {isLoading && <PreventClickMask />}

      {/* Header */}
      <Header isEnter={isEnter} serverTheme={theme} serverMode={mode} />

      {/* Children */}
      <motion.section
        variants={motionVariants}
        initial="close"
        animate={controls}
      >
        {children}
      </motion.section>

      {/* Background Mask */}
      <section className="fixed top-0 left-0 z-[-1] w-full h-screen opacity-35 mix-blend-multiply dark:bg-background bg-background">
        <video
          muted
          autoPlay
          loop
          playsInline
          className="h-full w-full object-cover mix-blend-multiply"
        >
          <source
            src="https://www.usestate.org/assets/video/home-background.mp4"
            type="video/mp4"
          />
        </video>
      </section>
    </>
  );
};

export default MainLayout;
