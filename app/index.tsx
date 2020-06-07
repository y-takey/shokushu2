import "core-js/stable";
import "regenerator-runtime/runtime";
import * as React from "react";
import { render } from "react-dom";

import App from "~/screens/App";
import "./app.less";

render(<App />, document.getElementById("app"));
