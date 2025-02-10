import TextHyperLink from "@/app/components/Text";
import React from "react";

const AboutMe = () => {
  return (
    <section className="py-24 w-full h-full">
      <div className="grid grid-cols-12 pt-48">
        <div className="col-span-11 col-start-0 text-end text-4xl tracking-wider mb-24 border-r-4 pr-4 border-[#eb5930]">
          About me
        </div>
        <div className="col-span-3 col-start-3">
          <TextHyperLink
            onClick={() => {
              document.location = "mailto:khang17.dev@gmail.com";
            }}
          >
            Email
          </TextHyperLink>
          <TextHyperLink>Linkedin</TextHyperLink>
          <TextHyperLink>Github</TextHyperLink>
          <TextHyperLink>Facebook</TextHyperLink>
          <TextHyperLink>Instagram</TextHyperLink>
          <TextHyperLink>Resume</TextHyperLink>
        </div>
        <div className="col-end-12 col-span-6 justify-self-end text-2xl tracking-widest leading-normal max-lg:text-xl text-primary/70">
          My work is mainly focused on third-dimension modeling, texturing and
          rendering. I like exploring the creatures with a touch of dark
          surrealism for characters and production.
          <br />
          <br /> Now I&apos;m an interactive media design student in Istanbul ⏤
          currently freelancing and seeking internship opportunities. My work is
          mainly focused on third-dimension modeling, texturing and rendering. I
          like exploring the creatures with a touch of dark surrealism for
          characters and production.
          <br />
          <br /> Now I&apos;m an interactive media design student in Istanbul ⏤
          currently freelancing and seeking internship opportunities. My work is
          mainly focused on third-dimension modeling, texturing and rendering. I
          like exploring the creatures with a touch of dark surrealism for
          characters and production.
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
  );
};

export default AboutMe;
