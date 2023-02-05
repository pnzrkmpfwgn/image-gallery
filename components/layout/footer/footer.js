import classes from "./footer.module.css";

export default function Footer() {
  return (
    <footer title="footer" id="footer" className={classes.background + " " + classes.footer}>
      <small title="" id="">
        {" "}
        pnzrkmpfwgn &copy; {new Date().getFullYear()}{" "}
      </small>
    </footer>
  );
}
