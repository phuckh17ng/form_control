"use client";

import { motion, useCycle } from "framer-motion";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { IoMenu, IoMoon, IoSunny } from "react-icons/io5";
import Text3d from "../../Text3d";

type Props = { serverTheme?: string; serverMode?: string };

// const menuVariants = {
//   initial: { height: 28 },
//   open: {
//     height: "auto",
//   },
//   closed: { height: 28 },
// };

const Header = (props: Props) => {
  const { serverTheme } = props;
  // const [isSliderMode, setSliderMode] = useState<boolean>(true);
  const [theme, setTheme] = useState<string | undefined>(serverTheme);
  const [current, cycle] = useCycle(
    serverTheme === "light",
    serverTheme !== "light"
  );
  // const [isSearchActive, setIsSearchActive] = useState(false);
  const modeVariants = {
    light: { x: 0 },
    dark: { x: 28 },
  };

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

  return (
    <header className="sticky top-0 left-0 flex justify-between items-center py-8 px-16 z-[100] backdrop-blur-sm">
      <h1 className="font-pacifico text-[20px]">phuckh17ng</h1>
      <div className="flex items-center justify-between gap-6 h-[36px]">
        {/* <div
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
        </div> */}
        <Text3d primary="About" />
        <Text3d primary="Projects" />
        {/* <button
          onClick={() => {
            console.log("click");
          }}
          className="bg-primary p-[6px] rounded-full flex justify-center items-center"
        >
          <IoMusicalNote className="text-[16px] text-icon" />
        </button> */}
        <motion.div
          className="flex p-[4px] border border-border rounded-full w-[54px] cursor-pointer relative"
          onClick={toggleTheme}
          onTapStart={() => cycle()}
        >
          {theme === "light" && (
            <IoMoon className="text-[16px] absolute right-2 opacity-50 rotate-[250deg]" />
          )}
          <motion.div
            className="w-[16px] h-[16px] rounded-full bg-primary"
            initial={serverTheme}
            animate={current ? "light" : "dark"}
            variants={modeVariants}
          />
          {theme === "dark" && (
            <IoSunny className="text-[16px] absolute left-2 opacity-50" />
          )}
        </motion.div>

        {/* <button
          onClick={toggleTheme}
          className="rounded-full flex justify-center items-center p-[6px] bg-primary"
        >
          {theme === "light" ? (
            <IoMoon className="text-[16px] text-icon" />
          ) : (
            <IoSunny className="text-[16px] text-icon" />
          )}
        </button> */}

        <button
          onClick={() => {
            console.log("click");
          }}
          className="rounded-full flex justify-center items-center p-[6px] bg-primary"
        >
          <IoMenu className="text-[16px] text-icon" />
        </button>
        {/* <motion.div
            className="absolute top-0 left-0 w-full rounded-t-full rounded-b-full bg-icon overflow-hidden"
            variants={menuVariants}
            initial="initial"
            exit="closed"
            animate={isSearchActive ? "open" : "closed"}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="grid items-center justify-center pt-[calc(28px+1rem)] pb-4 gap-8">
              <IoPerson className="text-[16px] text-primary" />
              <IoMusicalNotes className="text-[16px] text-primary" />
              <IoPerson className="text-[16px] text-primary" />
            </div>
          </motion.div> */}
      </div>
    </header>
  );
};

export default Header;
