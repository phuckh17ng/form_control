import clsx from "clsx";
import Image from "next/image";

const CoreValue = () => {
  return (
    <section className="py-24 w-full h-full">
      <div className="grid grid-cols-12 pt-24">
        <div className="col-span-10 col-start-2 mb-24 justify-items-center">
          <p className="border-b-4 pb-4 border-[#eb5930] text-center text-4xl tracking-widest px-2">
            Core Values
          </p>
        </div>{" "}
        <div className="col-start-2 col-span-6 mt-4 text-2xl tracking-wider leading-normal max-lg:text-xl text-primary/70">
          {" "}
          My work is mainly focused on third-dimension modeling, texturing and
          rendering. I like exploring the creatures with a touch of dark
          surrealism for characters and production.
          <br />
          <br /> Now I&apos;m an interactive media design student in Istanbul ⏤
          currently freelancing and seeking internship opportunities. My work is
          mainly focused on third-dimension modeling, texturing and rendering. I
          like exploring the creatures with a touch of dark surrealism for
          characters and production.
          <br />
          <br /> Now I&apos;m an interactive media design student in Istanbul ⏤
          currently freelancing and seeking internship opportunities. My work is
          mainly focused on third-dimension modeling, texturing and rendering. I
          like exploring the creatures with a touch of dark surrealism for
          characters and production.
          <br />
        </div>
        <div className="col-start-9 col-span-3 mt-4">
          <div className="w-full overflow-hidden">
            <Image
              src="/images/vagabond.png"
              width={300}
              height={0}
              alt="vagabond"
              className={clsx("aspect-auto")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValue;
