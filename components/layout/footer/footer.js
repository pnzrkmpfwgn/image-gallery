import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer title="footer" id="footer" className={classes.background + " " + classes.footer}>
      <small title="Ülkü Ayberk Yiğit" id="ülkü_ayberk_yiğit">
        {" "}
        Ülkü Ayberk Yiğit &copy; {new Date().getFullYear()}{" "}
      </small>
    </footer>
  );
}
