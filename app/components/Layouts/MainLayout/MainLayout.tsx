"use client";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import Header from "../Header";
import HeroLoading from "../HeroLoading";

type Props = {
  children: ReactNode;
  theme: string;
  mode: string;
};

const MainLayout = (props: Props) => {
  const { children, theme, mode } = props;
  const [isEnter, setIsEnter] = useState(false);

  return (
    <>
      <HeroLoading setIsEnter={setIsEnter} />
      <Header isEnter={isEnter} serverTheme={theme} serverMode={mode} />
      <section
        className={clsx(
          "opacity-0 blur-lg duration-[1200ms] ease-in-out transition-[opacity,filter]",
          isEnter && "opacity-100 blur-none"
        )}
      >
        {children}
      </section>
      {/* Background Mask */}
      <section className="fixed top-0 left-0 z-[-1] w-full h-screen opacity-35 mix-blend-multiply dark:bg-background bg-background">
        <video
          muted
          autoPlay
          loop
          playsInline
          className="h-full w-full object-cover mix-blend-multiply"
        >
          <source
            src="https://www.usestate.org/assets/video/home-background.mp4"
            type="video/mp4"
          />
        </video>
      </section>
    </>
  );
};

export default MainLayout;
