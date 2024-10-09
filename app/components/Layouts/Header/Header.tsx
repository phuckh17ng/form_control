"use client";

import { motion, useCycle } from "framer-motion";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { IoMenu, IoMoon, IoSearch, IoSunny } from "react-icons/io5";

type Props = { serverTheme?: string; serverMode?: string };

const searchVariants = {
  initial: { width: 0 },
  open: {
    width: "auto",
  },
  closed: { width: 0, transition: { delay: 0.15 } },
};

const modeVariants = {
  slider: { x: 0 },
  grid: { x: 28 },

  searchHoverEnd: {
    display: "hidden",
    width: "0px",
  },
};

const Header = (props: Props) => {
  const { serverTheme, serverMode } = props;
  const [isSliderMode, setSliderMode] = useState<boolean>(true);
  const [current, cycle] = useCycle("slider", "grid");
  const [theme, setTheme] = useState<string | undefined>(serverTheme);
  const [isSearchActive, setIsSearchActive] = useState(false);
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

  const handleMode = useCallback(() => {
    const element = document.getElementById("form-container");

    if (!element) return;
    if (isSliderMode) {
      element.classList.remove("slider_mode");
      element.classList.add("grid_mode");
      localStorage.setItem("mode", "grid");
      Cookies.set("mode", "grid");
    } else {
      element.classList.remove("grid_mode");
      element.classList.add("slider_mode");
      localStorage.setItem("mode", "slider");
      Cookies.set("mode", "slider");
    }
    setSliderMode(!isSliderMode);
  }, [isSliderMode]);

  return (
    <header className="sticky top-0 left-0 flex justify-between items-center py-8 px-16 z-[100] backdrop-blur-sm">
      <h1 className="font-pacifico text-[20px]">phuckh17ng</h1>
      <div className="flex items-center justify-between gap-6 h-[36px]">
        <div
          className="rounded-full flex items-center bg-primary"
          onMouseEnter={() => {
            setIsSearchActive(true);
          }}
          onMouseLeave={() => {
            setIsSearchActive(false);
          }}
        >
          <motion.div
            className="bg-transparent outline-none text-icon overflow-hidden flex justify-center w-0"
            variants={searchVariants}
            initial="initial"
            exit="closed"
            animate={isSearchActive ? "open" : "closed"}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <input
              type="text"
              name="search"
              autoComplete="off"
              className="bg-transparent outline-none text-icon pl-6 overflow-hidden flex justify-center"
            />
          </motion.div>

          <button
            onClick={() => {
              console.log("click");
            }}
            className="bg-primary p-[6px] rounded-full flex justify-center items-center"
          >
            <IoSearch className="text-[16px] text-icon" />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <motion.div
            className="p-[4px] border border-border rounded-full w-[54px] cursor-pointer"
            onClick={handleMode}
            animate={current}
            onTapStart={() => cycle()}
          >
            <motion.div
              className="w-[16px] h-[16px] rounded-full bg-primary"
              variants={modeVariants}
            ></motion.div>
          </motion.div>
          <div className="ml-2 text-xs leading-3">
            Slider /
            <br />
            Grid
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="bg-primary rounded-full flex justify-center items-center p-[6px]"
        >
          {theme === "light" ? (
            <IoMoon className="text-[16px] text-icon" />
          ) : (
            <IoSunny className="text-[16px] text-icon" />
          )}
        </button>
        <button
          onClick={() => {
            console.log("click");
          }}
          className="bg-primary rounded-full flex justify-center items-center p-[6px]"
        >
          <IoMenu className="text-[16px] text-icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;
