import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/hizmetlerimiz.module.css";
import { ServiceData } from "../../data/ServiceData";
import { useState } from "react";
import { wrap } from "popmotion";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export const ContentPlaceholder = ({ index }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const imageIndex = wrap(0, ServiceData[index].images.length, page);
  return (
    <motion.div
      variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
      transition={{ duration: 0.8 }}
      className={styles.content_placeholder}
    >
      <div className={styles.container}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            className={styles.img}
            key={page}
            src={ServiceData[index].images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </AnimatePresence>
        <div className={styles.prev} onClick={() => paginate(-1)}>
          {">"}
        </div>
        <div className={styles.next} onClick={() => paginate(1)}>
          {">"}
        </div>
      </div>
    </motion.div>
  );
};
