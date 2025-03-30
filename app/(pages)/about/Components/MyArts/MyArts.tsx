import Image from "next/image";

const MyArts = () => {
  return (
    <section className="my-24 w-full h-full">
      <div className="grid grid-cols-12 pt-24 gap-y-24">
        <div className="col-span-10 col-start-2 mb-24 justify-items-center">
          <p className="font-semibold border-b-4 pb-4 border-[#eb5930] text-center text-4xl tracking-widest px-2">
            {/* My <span className="italic text-4xl tracking-widest">Arts</span> */}
            Projects
          </p>
        </div>
        <>
          <div className="col-start-2 col-span-3 mb-80">
            <p className="text-5xl font-bold pt-24 ">Personal &nbsp; Project</p>
            <p className="text-xl pt-12 font-light tracking-widest leading-loose">
              Web Clone
            </p>
            <p className="text-xl pt-6 font-light tracking-widest leading-loose">
              Now I&apos;m an interactive media design student in Istanbul ⏤
              currently freelancing and seeking internship opportunities.
            </p>
          </div>
          <div className="col-start-6 col-span-6 mb-80">
            <div className="w-full overflow-hidden">
              <Image
                src="/images/game.png"
                alt="game"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                objectFit="contain"

                // width={300}
                // height={0}
                // alt="game"
                // className={clsx("aspect-auto")}
              />
            </div>
          </div>
        </>
        <>
          <div className="col-start-2 col-span-6 mb-80">
            <div className="w-full overflow-hidden">
              <Image
                src="/images/game.png"
                alt="game"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                objectFit="contain"

                // width={300}
                // height={0}
                // alt="game"
                // className={clsx("aspect-auto")}
              />
            </div>
          </div>
          <div className="col-start-9 col-span-3 mb-80">
            <p className="text-5xl font-bold pt-24 ">Personal &nbsp; Project</p>
            <p className="text-xl pt-12 font-light tracking-widest leading-loose">
              Web Clone
            </p>
            <p className="text-xl pt-6 font-light tracking-widest leading-loose">
              Now I&apos;m an interactive media design student in Istanbul ⏤
              currently freelancing and seeking internship opportunities.
            </p>
          </div>
        </>
        <>
          <div className="col-start-2 col-span-3 mb-80">
            <p className="text-5xl font-bold pt-24 ">Personal &nbsp; Project</p>
            <p className="text-xl pt-12 font-light tracking-widest leading-loose">
              Web Clone
            </p>
            <p className="text-xl pt-6 font-light tracking-widest leading-loose">
              Now I&apos;m an interactive media design student in Istanbul ⏤
              currently freelancing and seeking internship opportunities.
            </p>
          </div>
          <div className="col-start-6 col-span-6 mb-80">
            <div className="w-full overflow-hidden">
              <Image
                src="/images/game.png"
                alt="game"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                objectFit="contain"

                // width={300}
                // height={0}
                // alt="game"
                // className={clsx("aspect-auto")}
              />
            </div>
          </div>
        </>
        <>
          <div className="col-start-2 col-span-6 mb-80">
            <div className="w-full overflow-hidden">
              <Image
                src="/images/game.png"
                alt="game"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                objectFit="contain"

                // width={300}
                // height={0}
                // alt="game"
                // className={clsx("aspect-auto")}
              />
            </div>
          </div>
          <div className="col-start-9 col-span-3 mb-80">
            <p className="text-5xl font-bold pt-24 ">Personal &nbsp; Project</p>
            <p className="text-xl pt-12 font-light tracking-widest leading-loose">
              Web Clone
            </p>
            <p className="text-xl pt-6 font-light tracking-widest leading-loose">
              Now I&apos;m an interactive media design student in Istanbul ⏤
              currently freelancing and seeking internship opportunities.
            </p>
          </div>
        </>{" "}
        <>
          <div className="col-start-2 col-span-3 mb-80">
            <p className="text-5xl font-bold pt-24 ">Personal &nbsp; Project</p>
            <p className="text-xl pt-12 font-light tracking-widest leading-loose">
              Web Clone
            </p>
            <p className="text-xl pt-6 font-light tracking-widest leading-loose">
              Now I&apos;m an interactive media design student in Istanbul ⏤
              currently freelancing and seeking internship opportunities.
            </p>
          </div>
          <div className="col-start-6 col-span-6 mb-80">
            <div className="w-full overflow-hidden">
              <Image
                src="/images/game.png"
                alt="game"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                objectFit="contain"

                // width={300}
                // height={0}
                // alt="game"
                // className={clsx("aspect-auto")}
              />
            </div>
          </div>
        </>
        <>
          <div className="col-start-2 col-span-6 mb-80">
            <div className="w-full overflow-hidden">
              <Image
                src="/images/game.png"
                alt="game"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                objectFit="contain"

                // width={300}
                // height={0}
                // alt="game"
                // className={clsx("aspect-auto")}
              />
            </div>
          </div>
          <div className="col-start-9 col-span-3 mb-80">
            <p className="text-5xl font-bold pt-24 ">Personal &nbsp; Project</p>
            <p className="text-xl pt-12 font-light tracking-widest leading-loose">
              Web Clone
            </p>
            <p className="text-xl pt-6 font-light tracking-widest leading-loose">
              Now I&apos;m an interactive media design student in Istanbul ⏤
              currently freelancing and seeking internship opportunities.
            </p>
          </div>
        </>
      </div>
    </section>
  );
};

export default MyArts;
