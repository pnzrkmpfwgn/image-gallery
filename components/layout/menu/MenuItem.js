import { motion } from "framer-motion";
import classes from './menu.module.css';
const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y:{stiffness:1000,velocity:-100}
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y:{stiffness:1000}
        }
    }
}

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', "#4400FF"];

const MenuItem = ({ title,slug,i,isOpen,icon,toggleOpen }) => {
    const style = { border: `2px solid ${colors[i]}` };

    return (
        <motion.li className={isOpen ? classes.list_item + " " + classes.list_item_open : classes.list_item} variants={variants} whileHover={{scale:1.1}} whileTap={{scale:0.95}} >
            <div className={classes.icon} onClick={()=> toggleOpen()} > <i className={icon} ></i> </div>
        </motion.li>
    )
}

export default MenuItem;