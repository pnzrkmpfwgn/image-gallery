import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import classes from "./menu.module.css";

const variants = {
  open: {
    transition: { staggerChidren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChidren: 0.05, staggerDirection: -1 },
  },
};

const itemsID = [
  { title: "Lorem Ipsum", icon: "fas fa-home", slug: "/", id: 0 },
  {
    title: "Lorem Ipsum",
    icon: "fas fa-wrench",
    slug: "/",
    id: 1,
  },
  {
    title: "Lorem Ipsum",
    icon: "far fa-handshake",
    slug: "/",
    id: 2,
  },
  { title: "Lorem Ipsum", icon: "fas fa-phone", slug: "/", id: 3 },
];

const Navigation = ({ isOpen, toggleOpen }) => (
  <motion.ul
    id="navigasyon"
    title="Navigasyon"
    className={
      isOpen
        ? classes.unOrderedList + " " + classes.unOrderedList_open
        : classes.unOrderedList
    }
    variants={variants}
  >
    {itemsID.map((i) => (
      <MenuItem
        isOpen={isOpen}
        title={i.title}
        icon={i.icon}
        slug={i.slug}
        i={i.id}
        key={i.id}
        toggleOpen={toggleOpen}
      />
    ))}
  </motion.ul>
);

export default Navigation;
