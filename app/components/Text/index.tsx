"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import styles from "./styles.module.css";

type Props = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function TextHyperLink(props: Props) {
  const { children } = props;
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={clsx("py-2 my-4 w-fit relative", styles.textContainer)}>
      <div className="overflow-hidden w-fit h-fit">
        <motion.p
          className="text-2xl tracking-wider leading-normal max-lg:text-xl uppercase font-semibold"
          transition={{ duration: 0.5 }}
          variants={itemVariants}
        >
          {children}
        </motion.p>
      </div>
    </div>
  );
}

export function TextClip(props: Props) {
  const { children, className } = props;
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="overflow-hidden w-fit h-fit inline-block">
      <motion.p
        className={className}
        transition={{ duration: 0.5 }}
        variants={itemVariants}
      >
        {children}
      </motion.p>
    </div>
  );
}
