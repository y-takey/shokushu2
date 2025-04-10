import * as React from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "@ant-design/v5-patch-for-react-19";

import "./app.css";
import App from "./App";

const container = document.getElementById("app");
const root = createRoot(container as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
