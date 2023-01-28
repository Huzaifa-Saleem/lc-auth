import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//
import Routes from "./Routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={true} />
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
