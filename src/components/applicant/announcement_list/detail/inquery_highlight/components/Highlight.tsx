import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images: string[] = [
  "/assets/inquery/inquery-1.png",
  "/assets/inquery/inquery-2.png",
  "/assets/inquery/inquery-3.png",
  "/assets/inquery/inquery-4.png",
  "/assets/inquery/inquery-5.png",
  "/assets/inquery/inquery-6.png",
  "/assets/inquery/inquery-7.png"
];

const Highlight: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const goToPrevious = (): void => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (): void => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : 0,
      opacity: direction > 0 ? 0 : 1
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 0 : "-100%",
      opacity: direction < 0 ? 1 : 0
    })
  };

  return (
    <div className="w-full h-full flex-col items-center justify-center bg-gray-300">
      <section className="flex-center pt-20">
        <button
          className="w-[52px] h-[52px] rounded-full bg-gray-400 flex-center hover:bg-gray-500"
          onClick={goToPrevious}
        >
          <img src="/assets/inquery/previous.svg" alt="Previous" />
        </button>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Inquery ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain mx-[17px]"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.3 }
            }}
          />
        </AnimatePresence>
        <button
          className="w-[52px] h-[52px] rounded-full bg-gray-400 flex-center hover:bg-gray-500"
          onClick={goToNext}
        >
          <img src="/assets/inquery/next.svg" alt="Next" />
        </button>
      </section>

      <div className="flex justify-center mt-5 space-x-2 overflow-x-auto h-[100px]">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-16 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
              index === currentIndex
                ? "border-2 border-blue-500 scale-110"
                : "opacity-50"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Highlight;
