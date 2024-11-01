"use client";

import Card from "@/app/components/Card";
import useDebounce from "@/app/hooks/useDebounce";
import {
  AutocompleteSyntax,
  AutoCompleteUsageSyntax,
  top100FilmsSyntax,
} from "@/app/syntax/Autocomplete";
import {
  CheckboxSyntax,
  MultiCheckboxUsageSyntax,
} from "@/app/syntax/MultiCheckbox";
import { PasswordUsageSyntax, TextFieldSyntax } from "@/app/syntax/Password";
import { RadioGroupSyntax, RadioUsageSyntax } from "@/app/syntax/Radio";
import { SelectSyntax, SelectUsageSyntax } from "@/app/syntax/Select";
import { SliderSyntax, SliderUsageSyntax } from "@/app/syntax/Slider";
import AutocompleteUsage from "@/app/usages/Autocomplete/AutocompleteUsage";
import MultiCheckboxUsage from "@/app/usages/Checkbox/MultiCheckboxUsage";
import RadioGroupUsage from "@/app/usages/Radio/RadioGroupUsage";
import SelectUsage from "@/app/usages/Select/SelectUsage";
import SliderUsage from "@/app/usages/Slider/SliderUsage";
import PasswordUsage from "@/app/usages/TextField/PasswordUsage";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import dynamic from "next/dynamic";
import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import CardExpand from "./components/CardExpand";
import "./styles.css";

export type Item = {
  id: string;
  title: string;
  content: JSX.Element;
  syntax: {
    id: string;
    title: string;
    content: string;
  }[];
};

const BackdropVideo = dynamic(() => import("./components/BackdropVideo"));

export default function FormControl() {
  // Framer motion controls
  const dragControls = useDragControls();

  // Ref
  const constraintsRef = useRef(null);

  // State
  const [selectedCard, setSelectedCard] = useState<Item | undefined>();
  const [searchTerm, setSearchTerm] = useState("");

  // Contents Usage
  const contents = useMemo(
    () => [
      {
        id: "password_id",
        title: "Password",
        content: <PasswordUsage />,
        syntax: [
          {
            id: "1",
            title: "TextField.tsx",
            content: TextFieldSyntax,
          },
          {
            id: "2",
            title: "PasswordUsage.tsx",
            content: PasswordUsageSyntax,
          },
        ],
      },
      {
        id: "radio_group_id",
        title: "Radio Group",
        content: <RadioGroupUsage />,
        syntax: [
          {
            id: "1",
            title: "RadioGroup.tsx",
            content: RadioGroupSyntax,
          },
          {
            id: "2",
            title: "RadioUsage.tsx",
            content: RadioUsageSyntax,
          },
        ],
      },
      {
        id: "select+id",
        title: "Select",
        content: <SelectUsage />,
        syntax: [
          {
            id: "1",
            title: "Select.tsx",
            content: SelectSyntax,
          },
          {
            id: "2",
            title: "SelectUsage.tsx",
            content: SelectUsageSyntax,
          },
        ],
      },
      {
        id: "autocomplete_id",
        title: "Autocomplete",
        content: <AutocompleteUsage />,
        syntax: [
          {
            id: "1",
            title: "AutoComplete.tsx",
            content: AutocompleteSyntax,
          },
          {
            id: "2",
            title: "AutoCompleteUsage.tsx",
            content: AutoCompleteUsageSyntax,
          },
          {
            id: "3",
            title: "top100Films.ts",
            content: top100FilmsSyntax,
          },
        ],
      },
      {
        id: "multi_checkbox_id",
        title: "Multi Checkbox",
        content: <MultiCheckboxUsage />,
        syntax: [
          {
            id: "1",
            title: "Checkbox.tsx",
            content: CheckboxSyntax,
          },
          {
            id: "2",
            title: "MultiCheckboxUsage.tsx",
            content: MultiCheckboxUsageSyntax,
          },
        ],
      },
      {
        id: "slider_id",
        title: "Slider",
        content: <SliderUsage />,
        syntax: [
          {
            id: "1",
            title: "Slider.tsx",
            content: SliderSyntax,
          },
          {
            id: "2",
            title: "SliderUsage.tsx",
            content: SliderUsageSyntax,
          },
        ],
      },
    ],
    []
  );

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

  const handleSearchContent = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
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
          className="mt-8 rounded-full h-full flex items-center gap-2 border border-transparent bg-background py-1 px-4 text-primary"
          onHoverStart={() => {}}
        >
          <button
            onClick={() => {
              console.log("click");
            }}
            className="pl-2"
          >
            <IoSearch className="text-3xl opacity-70" />
          </button>
          <input
            type="text"
            name="search"
            className="bg-transparent w-[16rem] outline-none pl-4 text-primary placeholder:text-xl placeholder:font-light placeholder:text-primary/50 text-xl leading-[40px]"
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
              className="w-full justify-center items-center gap-6 px-24 grid-cols-3 slider_mode transition-all"
            >
              {filteredContents.map((item, index) => {
                return (
                  <Card
                    key={index}
                    selectedCard={item}
                    setSelectedCard={setSelectedCard}
                  />
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Card Details Expand */}
      <AnimatePresence>
        {selectedCard?.id && (
          <CardExpand
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
