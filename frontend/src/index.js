import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

const theme = {
  logoRed: "rgb(233, 0, 22)",
  buttonGray: "rgb(255, 255, 255)",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <Suspense fallback={<div>loading...</div>}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Suspense>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
