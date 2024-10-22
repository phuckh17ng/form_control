"use client";
import React, { ReactNode } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

type Props = {
  children: ReactNode;
};

const SmoothScrolling = (props: Props) => {
  const { children } = props;
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScrolling;
