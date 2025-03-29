import { TextClip } from "@/app/components/Text";
import clsx from "clsx";
import { cubicBezier, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const CoreValue = () => {
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: false, amount: 0.5 });

  const textVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delay: 1 },
    },
  };

  const imageVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: { duration: 0.75 },
    },
  };
  return (
    <section className="py-24 w-full h-full">
      <div className="grid grid-cols-12 pt-24" ref={scrollRef}>
        <div className="col-span-10 col-start-2 mb-24 justify-items-center">
          <p className="font-semibold border-b-4 pb-4 border-[#eb5930] text-center text-4xl tracking-widest px-2">
            Core Values
          </p>
        </div>{" "}
        <motion.div
          className="col-start-2 col-span-6 mt-4 text-2xl tracking-wider leading-normal max-lg:text-xl text-primary/70"
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
        <div className="col-start-9 col-span-3 mt-4">
          <motion.div
            className="w-full overflow-hidden"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={imageVariants}
            transition={{ ease: cubicBezier(1, 0.02, 0.31, 1), duration: 0.3 }}
          >
            <Image
              src="/images/vagabond.png"
              width={300}
              height={0}
              alt="vagabond"
              className={clsx("aspect-auto")}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoreValue;
