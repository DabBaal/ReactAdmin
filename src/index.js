import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//路由部分
import { BrowserRouter } from "react-router-dom";

//数据存储部分
import memoryUtils from "./utils/memoryUtils";
import storeUtils from "./utils/storeUtils";

memoryUtils.user = storeUtils.getUser()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
