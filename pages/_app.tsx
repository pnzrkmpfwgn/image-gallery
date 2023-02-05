import '../styles/globals.css'
import type { AppProps } from 'next/app'
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import Layout from "../components/layout/layout";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/globals.css";
let copies: any[] = [];
const onLoad = () => {
  const nodes = document.querySelectorAll(
    "link[rel=stylesheet], style:not([media=x])"
  );
  copies = [...nodes].map((el) => el.cloneNode(true));

  for (let copy of copies) {
    copy.removeAttribute("data-n-p");
    copy.removeAttribute("data-n-href");

    document.head.appendChild(copy);
  }
};

const onExit = () => {
  for (let copy of copies) {
    document.head.removeChild(copy);
  }
};
class MyApp extends App {
  componentDidMount() {
    Router.events.on("beforeHistoryChange", onLoad);
  }
  componentWillUnmount() {
    Router.events.off("beforeHistoryChange", onLoad);
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <>
        <Layout>
          <AnimatePresence mode="wait" onExitComplete={onExit}>
            <motion.div
              key={router.route}
              initial="pageInitial"
              exit="pageExit"
              animate="pageAnimate"
              variants={{
                pageInitial: {
                  opacity: 0,
                  x: 300,
                  transition: { duration: 0.5, delay: 0.5, ease: "easeInOut" },
                },
                pageAnimate: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, delay: 0.5, ease: "easeInOut" },
                },
                pageExit: {
                  opacity: 0,
                  x: -300,
                  transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" },
                },
              }}
            >
              <Head>
                <link
                  rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
                  integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
                  crossOrigin="anonymous"
                />
              </Head>

              <Component {...pageProps} key={router.route} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </>
    );
  }
}

export default MyApp;
