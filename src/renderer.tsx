import * as React from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";

import "./app.css";
import App from "./renderer/App";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
