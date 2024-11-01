import { useCommonStore } from "@/app/stores/commonStore";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { IoCheckmark, IoCopyOutline, IoRemove } from "react-icons/io5";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Item } from "../page";

type Props = {
  selectedCard: Item;
  setSelectedCard: (item?: Item) => void;
};

const CardExpand = (props: Props) => {
  const { selectedCard, setSelectedCard } = props;

  // Stores
  const { theme } = useCommonStore();

  // States
  const [activeTab, setActiveTab] = useState("1");
  const [isCopied, setIsCopied] = useState(false);

  /**
   * handleCardDetailsExit
   * @param event: React.KeyboardEvent<HTMLDivElement>
   */
  const handleCardDetailsExit = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        setSelectedCard(undefined);
      }
    },
    [setSelectedCard]
  );

  /**
   * handleNarrow
   */
  const handleNarrow = useCallback(() => {
    setSelectedCard(undefined);
  }, [setSelectedCard]);

  return (
    <motion.div
      layoutId={selectedCard.id}
      className="fixed top-0 left-0 z-[999] text-primary flex bg-card w-screen h-screen outline-none overflow-hidden isolate"
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
            <video muted autoPlay loop playsInline preload="auto" width="100%">
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
            <div className="w-full flex items-center overflow-hidden bg-card/40 relative z-0">
              <button
                className="absolute top-1/2 right-0 -translate-y-1/2 p-4 px-3 bg-card/30 hover:bg-card/60"
                onClick={() => {
                  navigator.clipboard.writeText(
                    selectedCard.syntax.filter(
                      (item) => item.id === activeTab
                    )[0].content
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
              {selectedCard.syntax.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={clsx(
                      "cursor-pointer py-2 px-4 select-none",
                      activeTab === item.id
                        ? "bg-card/60 font-semibold relative text-primary"
                        : "bg-card/30 font-semibold text-primary/40"
                    )}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.title}
                  </div>
                );
              })}
            </div>
            <SyntaxHighlighter
              data-lenis-prevent
              language="javascript"
              style={theme === "light" ? atomOneLight : atomOneDark}
              customStyle={{
                background: "rgb(var(--color-card) / 100%)",
                opacity: 0.8,
                overflowY: "auto",
                height: "calc(100% - 2.5rem)",
                padding: "0px 24px 16px 24px",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {
                selectedCard.syntax.filter((item) => item.id === activeTab)[0]
                  .content
              }
            </SyntaxHighlighter>
          </motion.div>
        </motion.div>
        <motion.div
          className="w-1/2 bg-card h-full flex justify-center items-center relative"
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
  );
};

export default CardExpand;
