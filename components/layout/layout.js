import { useState, useEffect } from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import classes from "./layout.module.css";
import { useOnScreen,useMediaQuery } from '../../utils/hooks'

export default function Layout({ children }) {
 // const [size, setSize] = useState();
  const [ref, visible] = useOnScreen({ rootMargin: '-100px' })
  const size = useMediaQuery(768)
  // useEffect(() => {
  //   setSize(document.body.clientWidth);
  // }, []);
  // useEffect(() => {
  //   const onResize = (e) => {
  //     setSize(e.target.outerWidth);
  //   };
  //   window.addEventListener("resize", onResize);
  //   return () => {
  //     window.removeEventListener("resize", onResize);
  //   };
  // }, []);
  return (
    <>
      {size ? null : <div ref={ref} className={classes.content} ></div>}
      <Header visible={visible} />
      {size ? <div ref={ref} className={classes.content} ></div> : null}
      <main className={classes.main} title="Main" id="main">
        {children}
      </main>
      <Footer />
    </>
  );
}

