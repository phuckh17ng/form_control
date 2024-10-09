"use client";

import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { IoRemove, IoSearch } from "react-icons/io5";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Card from "./components/Card";
import useDebounce from "./hooks/useDebounce";
import "./styles.css";
import { AutocompleteSyntax } from "./syntax/Autocomplete/Autocomplete";
import AutocompleteUsage from "./usages/AutocompleteUsage";
import MultiCheckboxUsage from "./usages/MultiCheckboxUsage";
import PasswordUsage from "./usages/PasswordUsage";

export type Item = {
  id: string;
  title: string;
  content: JSX.Element;
};

const contents = [
  {
    id: "1",
    title: "Autocomplete",
    content: <AutocompleteUsage />,
  },
  {
    id: "2",
    title: "Multi Checkbox",
    content: <MultiCheckboxUsage />,
  },
  { id: "3", title: "Password", content: <PasswordUsage /> },

  {
    id: "4",
    title: "Autocomplete",
    content: <AutocompleteUsage />,
  },
  {
    id: "5",
    title: "Multi Checkbox",
    content: <MultiCheckboxUsage />,
  },
  { id: "6", title: "Password", content: <PasswordUsage /> },
];

export default function Home() {
  // Framer motion controls
  const controls = useDragControls();

  // Ref
  const constraintsRef = useRef(null);

  // State
  const [selectedCard, setSelectedCard] = useState<Item | undefined>();
  const [searchTerm, setSearchTerm] = useState("");

  // Hooks
  const debounce = useDebounce(searchTerm, 500);

  // Filter contents
  const filteredContents = useMemo(
    () =>
      contents.filter((content) =>
        content.title.toLowerCase().includes(debounce.toLowerCase())
      ),
    [debounce]
  );

  const handleNarrow = useCallback(() => {
    setSelectedCard(undefined);
  }, []);

  const handleSearchContent = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  return (
    <div className="w-full h-full">
      <section className="p-24 w-full flex flex-col items-center relative z-10">
        <div className="w-full">
          <h1 className="text-8xl font-thin text-center pb-4">Form Control</h1>
          <p className="text-center pb-1 tracking-widest italic font-light">
            - No more pain dealing with forms -
          </p>
          <p className="text-center text-lg tracking-wide font-light">
            Designed to simplify form creation and validation, this project
            utilizes MUI and Yup for a streamlined development experience.
          </p>
        </div>
        <motion.div
          className="mt-8 rounded-full h-full flex items-center gap-2 border border-transparent bg-white py-1 px-4"
          onHoverStart={() => {}}
        >
          <button
            onClick={() => {
              console.log("click");
            }}
            className="pl-2"
          >
            <IoSearch color="#000" className="text-3xl opacity-70" />
          </button>
          <input
            type="text"
            name="search"
            className="bg-transparent w-[16rem] outline-none pl-4 text-black placeholder:text-xl placeholder:font-light placeholder:text-black/50 text-xl leading-[40px]"
            onFocus={() => console.log("focus")}
            onBlur={() => console.log("blur")}
            onChange={handleSearchContent}
            placeholder="Quick search..."
            autoComplete="off"
          />
        </motion.div>
      </section>

      <section className="py-24 w-screen flex justify-center items-center z-10 relative">
        <div className="w-full h-full" ref={constraintsRef}>
          <motion.div
            className="w-full min-w-fit"
            drag="x"
            dragConstraints={constraintsRef}
            dragControls={controls}
          >
            <motion.div
              id="form-container"
              className="w-full justify-center items-center gap-6 px-16 grid-cols-3 slider_mode transition-all"
            >
              {filteredContents.map((item, index) => {
                return (
                  <Card
                    key={index}
                    title={item.title}
                    id={item.id}
                    setSelectedCard={setSelectedCard}
                  >
                    {item.content}
                  </Card>
                );
              })}
            </motion.div>
          </motion.div>

          {/* <div className="bg-zinc-300 w-40 h-12 mt-16 rounded-full flex justify-between items-center px-4">
            <div className="bg-black/30 w-6 h-6 rounded-full"></div>
            <div className="bg-black/30 w-6 h-6 rounded-full"></div>
            <div className="bg-black/30 w-6 h-6 rounded-full"></div>
          </div> */}
        </div>
      </section>

      <AnimatePresence>
        {selectedCard?.id && (
          <motion.div
            layoutId={selectedCard.id}
            className="fixed top-0 left-0 z-[9999] text-black flex bg-white w-screen h-screen"
          >
            <div className="w-full h-full flex justify-between items-center">
              <div className="flex justify-between items-start absolute top-0 right-0 w-1/2 z-10 p-6">
                <motion.p
                  className="text-3xl tracking-wide leading-4 text-start ml-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  {selectedCard.title}
                </motion.p>
                <button onClick={handleNarrow} className="text-[24px]">
                  <IoRemove className="text-[24px]" />
                </button>
              </div>
              <motion.div className="w-1/2 h-full flex justify-center items-center relative p-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{
                    delay: 0.75,
                    duration: 3,
                    ease: "easeIn",
                  }}
                  className="absolute w-full h-full overflow-hidden top-0 left-0 blur-2xl"
                >
                  <video muted autoPlay loop playsInline width="100%">
                    <source
                      src="https://accdistribution.eu/wp-content/uploads/2022/09/ACC_graphic_animation_hero.mp4"
                      type="video/mp4"
                    />
                  </video>
                </motion.div>
                <motion.div
                  className="w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.65,
                    duration: 0.5,
                    ease: "easeIn",
                  }}
                >
                  <SyntaxHighlighter
                    language="javascript"
                    style={docco}
                    customStyle={{
                      background: "#fff",
                      opacity: 0.8,
                      overflowY: "auto",
                      height: "100%",
                      padding: "0px 24px 16px 24px",
                      borderRadius: "24px",
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                    }}
                  >
                    {AutocompleteSyntax}
                  </SyntaxHighlighter>
                </motion.div>
              </motion.div>

              <motion.div
                className="w-1/2 bg-white h-full flex justify-center items-center relative"
                initial={{ translateX: "-50%" }}
                animate={{ translateX: "0%" }}
                transition={{
                  delay: 0.5,
                  duration: 0.4,
                  ease: "circInOut",
                }}
              >
                {selectedCard.content}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="fixed top-0 left-0 z-0 w-full h-screen opacity-35 mix-blend-multiply bg-background">
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
    </div>
  );
}
