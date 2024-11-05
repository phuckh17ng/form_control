import React from "react";
import NextImage from "next/image";
import { ImageProps, StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  displayedImage: string | StaticImport;
} & ImageProps;

const Image = (props: Props) => {
  const { displayedImage, ...rest } = props;
  return (
    <NextImage
      {...rest}
      src={displayedImage}
      // className="w-[30rem] h-[22.5rem] aspect-auto transition-none object-contain"
      // alt="hcm_city"
      // width={0}
      // height={0}
      // translate="no"
      // objectFit="contain"
      // objectPosition="center"
      // layout="fixed"
      // loading="eager"
      // unoptimized
      // sizes="100vw"
      // priority
      // placeholder="blur"
      // blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQY..."
    />
  );
};

export default Image;
