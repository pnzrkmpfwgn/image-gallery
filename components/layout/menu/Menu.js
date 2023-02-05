import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../../../utils/hooks";
import MenuToggle from "./MenuToggle";
import Navigation from "./Navigation";
import classes from "./menu.module.css";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "string",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "string",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Menu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      className={isOpen ? classes.nav + " " + classes.nav_open : classes.nav}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className={isOpen ? classes.background + " " + classes.background_open : classes.background } variants={sidebar} />
      <Navigation isOpen={isOpen} toggleOpen={toggleOpen} />
      <MenuToggle isOpen={isOpen} toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default Menu;
