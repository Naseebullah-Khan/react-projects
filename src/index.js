import React from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App name="tab" />
      </Provider>
    </React.StrictMode>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
