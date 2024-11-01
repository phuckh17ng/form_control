"use client";

import TextHyperLink from "@/app/components/Text";
import { BsArrowDown } from "react-icons/bs";

export default function About() {
  return (
    <div className="w-full px-32 h-full max-md:px-12">
      {/* Welcome */}
      <section className="mt-[24rem] w-full h-full grid grid-cols-12 relative">
        <div className="w-full col-span-7 col-start-2 max-lg:col-start-1 max-md:col-span-12">
          <div className="flex justify-start font-extrabold text-[10rem] tracking-wider max-lg:text-[7rem] max-md:text-[6rem] leading-0 texte">
            Hi there.
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 -translate-x-1/2 max-md:hidden">
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
          <p className="text-4xl tracking-wider leading-loose max-lg:text-3xl text-primary/70 font-semibold">
            First of all, It&apos;s wonderful to be here. Welcome!
            <br />
            My name is Le Mau Phuc{" "}
            <span className="font-bold text-4xl max-lg:text-3xl tracking-wider leading-loose text-primary/90">
              Khang
            </span>
            , currently living and working in Ho Chi Minh City
          </p>
        </div>
      </section>
      <section className="py-24 w-full h-full">
        <div className="grid grid-cols-12 py-48">
          <div className="col-span-3 col-start-3">
            <TextHyperLink>Email</TextHyperLink>
            <TextHyperLink>Linkedin</TextHyperLink>
            <TextHyperLink>Github</TextHyperLink>
            <TextHyperLink>Facebook</TextHyperLink>
            <TextHyperLink>Instagram</TextHyperLink>
            <TextHyperLink>Resume</TextHyperLink>
          </div>
          <div className="col-end-12 col-span-6 justify-self-end text-2xl tracking-wider leading-normal max-lg:text-xl text-primary/70">
            My work is mainly focused on third-dimension modeling, texturing and
            rendering. I like exploring the creatures with a touch of dark
            surrealism for characters and production.
            <br />
            <br /> Now I&apos;m an interactive media design student in Istanbul
            ⏤ currently freelancing and seeking internship opportunities. My
            work is mainly focused on third-dimension modeling, texturing and
            rendering. I like exploring the creatures with a touch of dark
            surrealism for characters and production.
            <br />
            <br /> Now I&apos;m an interactive media design student in Istanbul
            ⏤ currently freelancing and seeking internship opportunities. My
            work is mainly focused on third-dimension modeling, texturing and
            rendering. I like exploring the creatures with a touch of dark
            surrealism for characters and production.
            <br />
          </div>
          {/* <Image
            src="/images/vagabond.png"
            width={500}
            height={500}
            alt="vagabond"
            className={clsx(
              "aspect-auto flex col-end-12 col-span-6 justify-self-end"
            )}
          /> */}
        </div>
      </section>
    </div>
  );
}
