"use client";

import { useCommonStore } from "@/app/stores/commonStore";
import { useEffect } from "react";
import { BsArrowDown } from "react-icons/bs";
import AboutMe from "./Components/About/AboutMe";
import CoreValue from "./Components/CoreValue/CoreValue";
import MyArts from "./Components/MyArts/MyArts";
import Skills from "./Components/Skills/Skills";

export default function About() {
  const { setCustomCursor } = useCommonStore();

  useEffect(() => {
    setCustomCursor(true, "default");
  }, [setCustomCursor]);

  return (
    <div className="w-full px-32 h-full max-md:px-12">
      {/* Welcome */}
      <section className="mt-[24rem] w-full h-full grid grid-cols-12 relative">
        <div className="w-full col-span-7 col-start-2 max-lg:col-start-1 max-md:col-span-12">
          <div className="flex justify-start font-extrabold text-[10rem] tracking-wider max-lg:text-[7rem] max-md:text-[6rem] leading-0">
            Hi there,
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 -translate-x-[4vw] max-md:hidden">
          <div className="w-fit h-fit relative select-none">
            <div className="absolute top-1/2 left-1/2 border-[3px] rounded-full w-[54px] h-[100px] -translate-x-1/2 -translate-y-1/2 flex items-end justify-center">
              <BsArrowDown className="text-[40px] mb-[8px] font-thin" />
            </div>
            <svg width="240" height="240" viewBox="0 0 240 240">
              <circle cx="120" cy="120" r="100" fill="none" />
              <path
                id="circlePath"
                d="M 120, 120 m -96, 0 a 96,96 0 1,1 192,0 a 96,96 0 1,1 -192,0"
                fill="none"
              />
              <text fill="rgb(var(--color-text) / 100%)">
                <textPath
                  href="#circlePath"
                  className="text-[28px] text-primary/10 uppercase tracking-[5.4px]"
                >
                  Scroll Down . Scroll Down .
                </textPath>
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 120 120"
                  to="360 120 120"
                  dur="24s"
                  repeatCount="indefinite"
                />
              </text>
            </svg>
          </div>
        </div>
        <div className="w-full col-span-7 col-start-3 max-lg:col-start-1 max-md:col-span-12 mt-4">
          <div className="text-4xl tracking-wider leading-loose max-lg:text-3xl text-primary/70 font-semibold">
            First of all, It&apos;s wonderful to have you here.
            <br />
            I&apos;m{" "}
            <div
              className="relative px-1 cursor-help inline-block"
              onMouseEnter={() => setCustomCursor(true, "helper")}
              onMouseLeave={() => setCustomCursor(true, "default")}
            >
              <p className="font-bold text-4xl max-lg:text-3xl tracking-wider text-primary/90 z-10 relative">
                Khang,&nbsp;
              </p>
              <div className="absolute -bottom-2 right-2 w-[calc(100%-2rem)] h-6 bg-[#eb5930] z-[1]" />
            </div>
            {/* currently living and working in{" "}
            <div
              className="relative px-1 cursor-none inline-block"
              onMouseEnter={() => setCustomCursor(true, "images")}
              onMouseLeave={() => setCustomCursor(true, "default")}
            >
              <p className="font-bold text-4xl max-lg:text-3xl tracking-wider leading-0 text-primary/90 relative z-10">
                Ho Chi Minh City
              </p>
              <div className="absolute -bottom-2 -right-2 w-[calc(100%-2rem)] h-6 bg-[#eb5930] z-[1]" />
            </div> */}
            welcome to my home. Come on in, let me show you around ^^
          </div>
        </div>
      </section>
      <AboutMe />
      <CoreValue />
      <Skills />
      <MyArts />
    </div>
  );
}
