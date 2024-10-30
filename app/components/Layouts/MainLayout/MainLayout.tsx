"use client";

import { useCommonStore } from "@/app/stores/commonStore";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import HeroLoading from "../HeroLoading";
import { NavigateLoading, PreventClickMask } from "../Loading/Loading";

type Props = {
  children: ReactNode;
  serverTheme: PaletteMode | undefined;
  mode: string;
};

const MainLayout = (props: Props) => {
  const { children, mode, serverTheme } = props;
  const { isLoading, isFirstVisit, navigateLoading, theme } = useCommonStore();
  const controls = useAnimation();
  const safari = useRef(false);
  const [isEnter, setIsEnter] = useState(false);

  const MUITheme = createTheme({
    palette: {
      mode: theme || serverTheme,
    },
  });

  const motionVariants = useMemo(
    () => ({
      close: {
        opacity: 0,
        filter: "blur(16px)",
        height: "100vh",
        overflow: "hidden",
        willChange: "unset",
        transition: {
          duration: 1.2,
          ease: "easeInOut",
          delay: navigateLoading.animate === "opening" ? 1.2 : 0,
        },
      },
      open: {
        opacity: 1,
        filter: "none",
        height: "100%",
        overflow: "hidden",
        willChange: "unset",
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

  useEffect(() => {
    safari.current = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }, []);

  return safari.current ? (
    <div className="text-center w-full h-screen flex flex-col justify-center items-center px-8">
      <p className="text-xl">
        This website does not support Safari browser. Please use another browser
        such as Chrome or Edge!
      </p>
      <p className="text-xl mt-8">Sincerely,</p>
      <p className="text-xl text-primary/50">phuckh17ng</p>
    </div>
  ) : (
    <>
      {/* Frist Visit Loading Screen*/}
      {isFirstVisit && <HeroLoading setIsEnter={setIsEnter} />}

      {/* Navigate Loading Screen*/}
      {!isFirstVisit && navigateLoading.isNavigating && <NavigateLoading />}

      {/* Loading Mask */}
      {isLoading && <PreventClickMask />}

      {/* Header */}
      <Header isEnter={isEnter} serverTheme={serverTheme} serverMode={mode} />

      {/* Children */}
      <ThemeProvider theme={MUITheme}>
        <motion.div
          variants={motionVariants}
          initial="close"
          animate={controls}
          className="!blur-none"
        >
          {children}
        </motion.div>
      </ThemeProvider>
      {/* Footer */}
      <Footer />

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
