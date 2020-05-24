// import * as React from "react";
import React, { Fragment } from "react";
import { render } from "react-dom";
import { AppContainer as ReactHotAppContainer } from "react-hot-loader";

import App from "~/containers/App";
import "./app.less";

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener("DOMContentLoaded", () =>
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("root")
  )
);
// render(
//   <AppContainer>
//     <App />
//   </AppContainer>,
//   document.getElementById("root")
// );

// if ((module as any).hot) {
//   (module as any).hot.accept("./containers/App", () => {
//     // eslint-disable-next-line global-require
//     const NextApp = require("./containers/App").default;
//     render(
//       <AppContainer>
//         <NextApp />
//       </AppContainer>,
//       document.getElementById("root")
//     );
//   });
// }
