"use client";
import { Item } from "@/app/page";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { IoMdExpand } from "react-icons/io";

type Props = {
  id: string;
  title: string;
  children: JSX.Element;
  setSelectedCard: (item: Item) => void;
  className?: string;
};

const Card = (props: Props) => {
  const {
    id,
    title,
    children,
    setSelectedCard,
    className = "bg-card w-[40rem] h-[40rem] relative",
  } = props;

  const handleExpand = useCallback(() => {
    console.log("id", id);
    setSelectedCard({ id: id, title: title, content: children });
  }, [children, id, setSelectedCard, title]);

  return (
    <motion.div className={className} layoutId={id}>
      <div className="text-[#111] flex justify-between items-start absolute top-0 left-0 w-full p-6">
        <p className="text-3xl tracking-wide leading-4">{title}</p>
        <button onClick={handleExpand}>
          <IoMdExpand className="text-[24px]" />
        </button>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
