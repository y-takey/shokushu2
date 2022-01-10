import * as React from "react";
import { render } from "react-dom";

import "./app.less";
import App from "./renderer/App";

render(<App />, document.getElementById("app"));
