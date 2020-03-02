import React from "react";
import ReactDOM from "react-dom";
import mockServer from "./services/mockServer";

import App from "./App";

if (process.env.NODE_ENV === "development") {
  mockServer.init();
}

ReactDOM.render(<App />, document.getElementById("root"));
