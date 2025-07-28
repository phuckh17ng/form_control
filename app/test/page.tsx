"use client";

import Image from "next/image";
import "./test.scss";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { useRef, useState } from "react";

export default function Test() {
  const data = [
    {
      id: "1",
      alt: "img",
      imageUrl:
        "https://images.unsplash.com/photo-1752440093057-1c188e7137e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1Mnx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      alt: "img",
      imageUrl:
        "https://images.unsplash.com/photo-1750263239811-bfad7ceffa10?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      alt: "img",
      imageUrl:
        "https://images.unsplash.com/photo-1752257690965-485767d4c334?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      alt: "img",
      imageUrl:
        "https://images.unsplash.com/photo-1752429475222-8eb8c9e7c531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "5",
      alt: "img",
      imageUrl:
        "https://images.unsplash.com/photo-1750544685909-7bcb07b25059?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "6",
      alt: "img",
      imageUrl:
        "https://images.unsplash.com/photo-1750778494630-52b400bf3beb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "7",
      alt: "img",
      imageUrl:
        "https://images.unsplash.com/photo-1752410768651-28ac73575288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "8",
      alt: "img",
      imageUrl:
        "https://images.unsplash.com/photo-1752434969975-f868b65be62b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "9",
      alt: "img",
      imageUrl:
        "https://images.unsplash.com/photo-1752517656834-bc635de26234?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1NHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "10",
      alt: "img",
      imageUrl:
        "https://images.unsplash.com/photo-1752454832347-59d5a881b1df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1Nnx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    imageUrl: string;
    alt: string;
  }>();

  const renderImageItem = (
    item: { id: string; imageUrl: string; alt: string },
    index: number
  ) => {
    return (
      <motion.div
        className="image-container"
        key={index}
        drag="x"
        dragConstraints={constraintsRef}
        dragControls={dragControls}
        layoutId={item.id}
      >
        <Image
          src={item.imageUrl}
          alt={item.alt}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          onClick={() => setSelectedItem(item)}
        />
        <div className="header-item">
          <div>
            <p>Travel</p>
          </div>
        </div>
      </motion.div>
    );
  };

  // Framer motion controls
  const dragControls = useDragControls();

  // Ref
  const constraintsRef = useRef(null);
  console.log("item", selectedItem);

  return (
    <div className="test-container">
      <div className="grid-masonry" ref={constraintsRef}>
        {data.map(renderImageItem)}
      </div>
      <AnimatePresence>
        {selectedItem?.id && (
          <div className="image-selected-container">
            <div
              className="image-item-container"
              onClick={() => setSelectedItem(undefined)}
            >
              <motion.div className="image-item" layoutId={selectedItem.id}>
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="header-item">
                  <div>
                    <p>Travel</p>
                  </div>
                </div>
                <motion.div
                  className="footer-item"
                  initial={{
                    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
                  }}
                  animate={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                  }}
                  exit={{
                    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeIn",
                  }}
                >
                  <motion.div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry
                      standard dummy text ever since the 1500s Lorem Ipsum is
                      simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry standard dummy
                      text ever since the 1500s Lorem Ipsum is simply dummy text
                      of the printing and typesetting industry.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              className="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeIn",
              }}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
