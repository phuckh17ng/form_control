"use client";

import { ReactNode } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

type Props = {
  children: ReactNode;
};

export default function TextHyperLink(props: Props) {
  const { children } = props;
  return (
    <div
      className={clsx(
        "py-2 my-4 text-2xl tracking-wider leading-normal max-lg:text-xl w-fit relative uppercase font-semibold",
        styles.textContainer
      )}
    >
      {children}
    </div>
  );
}
