import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//
import Routes from "./Routes";
import BgImage from "./components/BgImage";
import Head from "./layout/Head";
import Foot from "./layout/Foot";

function App() {
  return (
    <>
      <BrowserRouter>
        <BgImage />
        <Head />
        <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{
            duration: 2000,
            style: {
              background: "#101010",
              color: "rgba(255,255,255,.5)",
            },
          }}
        />
        <Routes />
        <Foot />
      </BrowserRouter>
    </>
  );
}

export default App;
