"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./styles.module.css";

type Props = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function TextHyperLink(props: Props) {
  const { children, ...rest } = props;
  return (
    <div
      {...rest}
      className={clsx(
        "py-2 my-4 text-2xl tracking-wider leading-normal max-lg:text-xl w-fit relative uppercase font-semibold",
        styles.textContainer
      )}
    >
      {children}
    </div>
  );
}
