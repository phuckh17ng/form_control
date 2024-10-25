"use client";

import { motion, useCycle } from "framer-motion";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { IoMenu, IoMoon, IoSunny } from "react-icons/io5";
import Text3d from "../../Text3d";
import { ABOUT_ROUTE, FORM_CONTROL_ROUTE, HOME_ROUTE } from "@/app/routers";
import { useCommonStore } from "@/app/stores/commonStore";
import { useRouter } from "next/navigation";
import useNavigate from "@/app/hooks/useNavigate";

type Props = { serverTheme?: string; serverMode?: string; isEnter?: boolean };

const motionVariants = {
  initialIcon: {
    opacity: 0,
  },
  logo: {
    opacity: 1,
    transition: { duration: 0.75, ease: "linear", delay: 2 },
  },
  about: {
    opacity: 1,
    transition: { duration: 0.75, ease: "linear", delay: 0.9 },
  },
  projects: {
    opacity: 1,
    transition: { duration: 0.75, ease: "linear", delay: 1.1 },
  },
  theme: {
    opacity: 1,
    transition: { duration: 0.75, ease: "linear", delay: 1.3 },
  },
  menu: {
    opacity: 1,
    transition: { duration: 0.75, ease: "linear", delay: 1.5 },
  },
};

const themeVariants = {
  light: { x: 0 },
  dark: { x: 28 },
};

const Header = (props: Props) => {
  const { serverTheme, isEnter } = props;
  // const router = useRouter();
  const { setNavigateLoading, navigateLoading } = useCommonStore();
  const [theme, setTheme] = useState<string | undefined>(serverTheme);
  const [current, cycle] = useCycle(
    serverTheme === "light",
    serverTheme !== "light"
  );

  const toggleTheme = useCallback(() => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      Cookies.set("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      Cookies.set("theme", "dark");
      setTheme("dark");
    }
  }, []);

  // const handleMode = useCallback(() => {
  //   const element = document.getElementById("form-container");

  //   if (!element) return;
  //   if (isSliderMode) {
  //     element.classList.remove("slider_mode");
  //     element.classList.add("grid_mode");
  //     localStorage.setItem("mode", "grid");
  //     Cookies.set("mode", "grid");
  //   } else {
  //     element.classList.remove("grid_mode");
  //     element.classList.add("slider_mode");
  //     localStorage.setItem("mode", "slider");
  //     Cookies.set("mode", "slider");
  //   }
  //   setSliderMode(!isSliderMode);
  // }, [isSliderMode]);
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    // setNavigateLoading(true, "closing");

    // const timeout1 = setTimeout(() => {
    //   navigate(HOME_ROUTE);
    //   setNavigateLoading(true, "opening");
    // }, 3000);

    // const timeout2 = setTimeout(() => {
    //   setNavigateLoading(false);
    // }, 7000);

    // return () => {
    //   clearTimeout(timeout1);
    //   clearTimeout(timeout2);
    // };
    navigate(HOME_ROUTE);
  }, [navigate]);

  return (
    <header className="fixed top-0 left-0 flex justify-between items-center py-8 px-16 z-[100] backdrop-blur-sm w-full select-none">
      <motion.h1
        animate={
          isEnter || navigateLoading.animate === "opening"
            ? "logo"
            : "initialIcon"
        }
        variants={motionVariants}
        className="font-pacifico text-[20px] cursor-pointer"
        onClick={handleNavigate}
      >
        phuckh17ng
      </motion.h1>
      <div className="flex items-center justify-between gap-6 h-[36px]">
        <motion.div
          animate={
            isEnter || navigateLoading.animate === "opening"
              ? "about"
              : "initialIcon"
          }
          variants={motionVariants}
          onClick={() => navigate(ABOUT_ROUTE)}
        >
          <Text3d primary="About" />
        </motion.div>
        <motion.div
          animate={
            isEnter || navigateLoading.animate === "opening"
              ? "projects"
              : "initialIcon"
          }
          variants={motionVariants}
          onClick={() => {
            navigate(FORM_CONTROL_ROUTE);
          }}
        >
          <Text3d primary="Projects" />
        </motion.div>
        <motion.div
          className="flex p-[4px] border border-border rounded-full w-[54px] cursor-pointer relative"
          onClick={toggleTheme}
          onMouseUp={() => cycle()}
          animate={
            isEnter || navigateLoading.animate === "opening"
              ? "theme"
              : "initialIcon"
          }
          variants={motionVariants}
        >
          {theme === "light" && (
            <IoMoon className="text-[16px] absolute right-2 opacity-50 rotate-[250deg]" />
          )}
          <motion.div
            className="w-[16px] h-[16px] rounded-full bg-primary"
            initial={serverTheme}
            animate={current ? "light" : "dark"}
            variants={themeVariants}
          />
          {theme === "dark" && (
            <IoSunny className="text-[16px] absolute left-2 opacity-50" />
          )}
        </motion.div>
        <motion.button
          animate={
            isEnter || navigateLoading.animate === "opening"
              ? "menu"
              : "initialIcon"
          }
          variants={motionVariants}
          onClick={() => {
            console.log("click");
          }}
          className="rounded-full flex justify-center items-center p-[6px] bg-primary"
        >
          <IoMenu className="text-[16px] text-icon" />
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
