import { TextClip, TextHyperLink } from "@/app/components/Text";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutMe = () => {
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: false, amount: 0.2 });
  const linkVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };

  const textVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <section className="py-24 w-full h-full">
      <div className="grid grid-cols-12 pt-48 mt-48" ref={scrollRef}>
        <motion.div className="relative col-span-11 col-start-0 mb-24 pr-4 overflow-hidden">
          <motion.div
            className="absolute h-full top-0 right-0 border-r-4 border-[#eb5930] z-10"
            // initial={{ opacity: 0, height: 0, borderStyle: "none" }}
            // whileInView={{
            //   opacity: 1,
            //   height: "100%",
            //   borderStyle: "solid",
            // }}
            // transition={{
            //   duration: 0.5,
            //   delay: 1.5,
            //   ease: cubicBezier(1, 0.02, 0.31, 1),
            // }}
            // viewport={{ root: scrollRef, amount: 0.8, once: true }}
          ></motion.div>
          <motion.p
            className="text-end text-4xl tracking-wider font-semibold text-primary"
            // initial={{ opacity: 0 }}
            // whileInView={{ opacity: 1 }}
            // transition={{ duration: 1, delay: 2, ease: easeInOut }}
            // viewport={{ root: scrollRef, amount: 0.8, once: true }}
          >
            About me
          </motion.p>
        </motion.div>
        <motion.div
          className="col-span-3 col-start-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={linkVariants}
        >
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
        </motion.div>
        <motion.div
          className="col-end-12 col-span-6 justify-self-end"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <TextClip className="text-2xl tracking-widest leading-normal max-lg:text-xl text-primary/70">
            My work is mainly focused on third-dimension modeling,
          </TextClip>
          <TextClip className="text-2xl tracking-widest leading-normal max-lg:text-xl text-primary/70">
            texturing and rendering. I like exploring the creatures
          </TextClip>
          <TextClip className="text-2xl tracking-widest leading-normal max-lg:text-xl text-primary/70">
            with a touch of dark surrealism for characters and production.
          </TextClip>
          <br /> <br />
          <TextClip className="text-2xl tracking-widest leading-normal max-lg:text-xl text-primary/70">
            Now I&apos;m an interactive media design student in Istanbul ⏤
            currently freelancing and seeking internship opportunities. My work
            is mainly focused on third-dimension modeling, texturing and
            rendering. I like exploring the creatures with a touch of dark
            surrealism for characters and production.
          </TextClip>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
