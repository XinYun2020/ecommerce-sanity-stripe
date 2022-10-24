import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout relative">
      <Head>
        <title>Keyboard Minimalist</title>
      </Head>
      {/* <header> */}
      <Navbar />
      {/* </header> */}
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
