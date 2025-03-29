import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
const list = [
  {
    type: "Work",
    title: "Software Developer",
    company: "NEC Vietnam",
    duration: "Now",
    description:
      "Responsible for developing, maintaining, and enhancing NEC's software products for various industries such as electronics, automotive, and home entertainment.",
  },
  {
    type: "Certificate",
    title: "Scrum Master I",
    company: "Scrum.org",
    duration: "2024",
    description:
      "Responsible for developing, maintaining, and enhancing NEC's software products for various industries such as electronics, automotive, and home entertainment.",
  },
  {
    type: "Work",
    title: "Software Developer Intern",
    company: "NEC Vietnam",
    duration: "2023",
    description:
      "Responsible for developing, maintaining, and enhancing NEC's software products for various industries such as electronics, automotive, and home entertainment.",
  },
  {
    type: "Work",
    title: "Backend Developer Intern",
    company: "FPT Software",
    duration: "2022",
    description:
      "Responsible for developing, maintaining, and enhancing NEC's software products for various industries such as electronics, automotive, and home entertainment.",
  },
];
const Skills = () => {
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: false, amount: 0.2 });

  const strokeVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 w-full h-full">
      <div className="grid grid-cols-12 mt-24" ref={scrollRef}>
        <div className="col-span-4 col-start-2 text-start text-4xl tracking-widest mb-24 border-l-4 pl-4 border-[#eb5930]">
          Work Experiences, Certificates & Awards
        </div>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className="col-start-2 relative col-span-10 flex justify-between border-border pt-12 pb-20 items-center"
            >
              <motion.div
                className="w-1/3 text-4xl max-lg:text-xl uppercase font-semibold"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={itemVariants}
                transition={{ duration: 0.7 }}
              >
                {item.type}
              </motion.div>
              <motion.div
                className="absolute bottom-0 h-[1px] bg-border w-full"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={strokeVariants}
                transition={{ delay: index * 0.25, duration: 1 }}
              />
              <div className="w-1/3 relative">
                <motion.p
                  className="text-4xl font-semibold max-lg:text-xl"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={itemVariants}
                  transition={{ duration: 0.7 }}
                >
                  {item.title}
                </motion.p>
                <motion.p
                  className="mt-2 max-lg:text-sm absolute -bottom-8"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={itemVariants}
                  transition={{ duration: 0.7 }}
                >
                  {item.company}
                </motion.p>
              </div>
              <motion.div
                className="w-1/3 text-end font-semibold text-4xl max-lg:text-xl"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={itemVariants}
                transition={{ duration: 0.7 }}
              >
                {item.duration}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
