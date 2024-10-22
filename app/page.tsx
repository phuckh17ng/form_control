"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import {
  IoCheckmark,
  IoCopyOutline,
  IoRemove,
  IoSearch,
} from "react-icons/io5";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Card from "./components/Card";
import useDebounce from "./hooks/useDebounce";
import "./styles.css";
import { PasswordSyntax, PasswordUsageSyntax } from "./syntax/Password";
import AutocompleteUsage from "./usages/Autocomplete/AutocompleteUsage";
import MultiCheckboxUsage from "./usages/Checkbox/MultiCheckboxUsage";
import RadioGroupUsage from "./usages/Radio/RadioGroupUsage";
import SelectUsage from "./usages/Select/SelectUsage";
import SliderUsage from "./usages/Slider/SliderUsage";
import PasswordUsage from "./usages/TextField/PasswordUsage";

export type Item = {
  id: string;
  title: string;
  content: JSX.Element;
};

export default function Home() {
  // Framer motion controls
  const dragControls = useDragControls();
  // const controls = useAnimation();

  // Ref
  const constraintsRef = useRef(null);

  // State
  const [selectedCard, setSelectedCard] = useState<Item | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [isCopied, setIsCopied] = useState(false);

  // Contents Usage
  const contents = useMemo(
    () => [
      { id: "password_id", title: "Password", content: <PasswordUsage /> },
      {
        id: "radio_group_id",
        title: "Radio Group",
        content: <RadioGroupUsage />,
      },
      { id: "select+id", title: "Select", content: <SelectUsage /> },
      {
        id: "autocomplete_id",
        title: "Autocomplete",
        content: <AutocompleteUsage />,
      },
      {
        id: "multi_checkbox_id",
        title: "Multi Checkbox",
        content: <MultiCheckboxUsage />,
      },
      {
        id: "slider_id",
        title: "Slider",
        content: <SliderUsage />,
      },
    ],
    []
  );

  const TabList = [
    {
      id: "1",
      title: "Password.tsx",
      content: PasswordSyntax,
    },
    {
      id: "2",
      title: "PasswordUsage.tsx",
      content: PasswordUsageSyntax,
    },
  ];

  // Hooks
  const debounce = useDebounce(searchTerm, 500);

  // Filter contents
  const filteredContents = useMemo(
    () =>
      contents.filter((content) =>
        content.title.toLowerCase().includes(debounce.toLowerCase())
      ),
    [contents, debounce]
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

  const handleCardDetailsExit = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      console.log("event.key", event.key);
      if (event.key === "Escape") {
        setSelectedCard(undefined);
      }
    },
    []
  );

  return (
    <div className="w-full h-full mt-36">
      {/* Introduction */}
      <section className="p-24 w-full flex flex-col items-center">
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

      {/* Cards Container */}
      <section className="py-24 w-screen flex justify-center items-center">
        <div className="w-full h-full cursor-grab" ref={constraintsRef}>
          <motion.div
            className="w-full min-w-fit"
            drag="x"
            dragConstraints={constraintsRef}
            dragControls={dragControls}
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
        </div>
      </section>

      {/* Card Details Expand */}
      <AnimatePresence>
        {selectedCard?.id && (
          <motion.div
            layoutId={selectedCard.id}
            className="fixed top-0 left-0 z-[9999] text-black flex bg-white w-screen h-screen outline-none overflow-hidden"
            onKeyDown={handleCardDetailsExit}
            style={{ WebkitTransform: "translateZ(0)", transform: "unset" }}
            tabIndex={0}
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
                  <div className="w-full flex items-center overflow-hidden bg-white/40 relative z-0">
                    <button
                      className="absolute top-1/2 right-0 -translate-y-1/2 p-4 px-3 bg-white/30 hover:bg-white/60"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          TabList.filter((item) => item.id === activeTab)[0]
                            .content
                        );
                        setIsCopied(true);
                      }}
                      onMouseLeave={() => {
                        setTimeout(() => {
                          setIsCopied(false);
                        }, 500);
                      }}
                    >
                      {isCopied ? (
                        <IoCheckmark className="text-xl" color="" />
                      ) : (
                        <IoCopyOutline className="text-xl" color="" />
                      )}
                    </button>
                    {TabList.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className={clsx(
                            "cursor-pointer py-2 px-4",
                            activeTab === item.id
                              ? "bg-white/60 font-semibold relative text-[#111]"
                              : "bg-white/30 font-semibold text-[#111]/40"
                          )}
                          onClick={() => setActiveTab(item.id)}
                        >
                          {item.title}
                        </div>
                      );
                    })}
                    {/* <div className="bg-white/60 py-2 px-4 rounded-tr-2xl relative z-10 font-semibold">
                      Password.tsx
                      <div className="absolute bottom-[0px] right-[0.3px] translate-x-full z-0">
                        <svg
                          width="1.5rem"
                          height="1.5rem"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.6"
                            d="M24 24C8 23 1 16 0 0V24H24Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="py-2 px-4 z-10 rounded-bl-2xl overflow-hidden relative opacity-50">
                      PasswordUsage.tsx
                    </div> */}
                  </div>

                  <SyntaxHighlighter
                    data-lenis-prevent
                    language="javascript"
                    style={docco}
                    customStyle={{
                      background: "#fff",
                      opacity: 0.8,
                      overflowY: "auto",
                      height: "calc(100% - 2.5rem)",
                      padding: "0px 24px 16px 24px",
                      // borderBottomLeftRadius: "24px",
                      // borderBottomRightRadius: "24px",
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                    }}
                  >
                    {TabList.filter((item) => item.id === activeTab)[0].content}
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
    </div>
  );
}
