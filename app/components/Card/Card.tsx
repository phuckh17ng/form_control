"use client";

import { Item } from "@/app/(pages)/projects/form-control/page";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { IoMdExpand } from "react-icons/io";

type Props = {
  selectedCard: Item;
  setSelectedCard: (item: Item) => void;
  className?: string;
};

const Card = (props: Props) => {
  const {
    selectedCard,
    setSelectedCard,
    className = "bg-card w-[40rem] h-[40rem] relative",
  } = props;

  const handleExpand = useCallback(() => {
    setSelectedCard(selectedCard);
  }, [selectedCard, setSelectedCard]);

  return (
    <motion.div className={className} layoutId={selectedCard.id}>
      <div className="text-primary flex justify-between items-start absolute top-0 left-0 w-full p-6">
        <p className="text-3xl tracking-wide leading-4">{selectedCard.title}</p>
        <button onClick={handleExpand}>
          <IoMdExpand className="text-[24px]" />
        </button>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        {selectedCard.content}
      </div>
    </motion.div>
  );
};

export default Card;
