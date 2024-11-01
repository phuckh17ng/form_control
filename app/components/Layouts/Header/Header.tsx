"use client";

import useNavigate from "@/app/hooks/useNavigate";
import { ABOUT_ROUTE, FORM_CONTROL_ROUTE, HOME_ROUTE } from "@/app/routers";
import { useCommonStore } from "@/app/stores/commonStore";
import { PaletteMode } from "@mui/material";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useCallback, useEffect } from "react";
import { IoMenu, IoMoon, IoSunny } from "react-icons/io5";
import Text3d from "../../Text3d";

type Props = {
  serverTheme?: PaletteMode | undefined;
  serverMode?: string;
  isEnter?: boolean;
};

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
  // Props
  const { serverTheme, isEnter } = props;

  // Navigate
  const navigate = useNavigate();

  // Stores
  const { navigateLoading, theme, setTheme } = useCommonStore();

  /**
   * Update UI theme
   */
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
  }, [setTheme]);

  // Init theme
  useEffect(() => {
    setTheme(serverTheme);
  }, [serverTheme, setTheme]);

  return (
    <header className="fixed top-0 left-0 flex justify-between items-center py-12 px-24 z-[100] w-full select-none max-md:py-6 max-md:px-12 backdrop-blur-sm">
      <div className="header--container flex justify-between items-center w-full">
        <motion.h1
          animate={
            isEnter || navigateLoading.animate === "opening"
              ? "logo"
              : "initialIcon"
          }
          variants={motionVariants}
          className="font-pacifico text-[20px] cursor-pointer"
          onClick={() => navigate(HOME_ROUTE)}
        >
          phuckh17ng
        </motion.h1>
        <div className="flex items-center justify-between gap-6 h-[36px]">
          <motion.div
            className="max-md:hidden"
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
            className="max-md:hidden"
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
            className="flex p-[4px] border border-border rounded-full w-[54px] cursor-pointer relative max-md:hidden"
            onClick={toggleTheme}
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
              animate={theme || serverTheme}
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
      </div>
    </header>
  );
};

export default Header;
