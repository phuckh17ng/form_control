"use client";

import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const CustomImage = ({ imgSrc }: { imgSrc: string }) => {
  // const loader = ({
  //   width,
  //   quality,
  //   src,
  // }: {
  //   width: number;
  //   quality?: number;
  //   src: string;
  // }) => {
  //   const props = [`w=${width}`];
  //   if (quality) props.push(`q=${quality}`);
  //   const queryStr = props.join("&");
  //   return `https://form-control-api.vercel.app${imgSrc}?${queryStr}`;
  // };

  const [loading, setLoading] = useState(true);
  return (
    <div className="relative w-[30rem] max-h-[22.5rem] h-full aspect-square">
      <Image
        className={clsx("w-full h-full object-cover")}
        alt="image"
        src={imgSrc}
        loader={({ src }) =>
          `https://form-control-api.vercel.app${src}?thumbnail=true`
        }
        sizes="10px"
        priority
        // width={0}
        // height={0}
        fill
      />
      <Image
        className={clsx(
          "w-full h-full object-cover transition-opacity duration-150 ease-in-out",
          loading ? "opacity-0" : "opacity-100"
        )}
        alt="image"
        src={imgSrc}
        // loader={loader}
        // sizes="(max-width: 30rem) 480px, 800px"
        // priority
        // width={0}
        // height={0}
        fill
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default CustomImage;
