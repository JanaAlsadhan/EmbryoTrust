import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import OverAllStates from "../context/OverAllStates"; // Import OverAllStates
import Screen from "./Screen";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <OverAllStates>
        <Screen />
      </OverAllStates>
    </BrowserRouter>
  </React.StrictMode>
);
