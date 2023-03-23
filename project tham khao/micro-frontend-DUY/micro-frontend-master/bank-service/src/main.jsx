import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import style from "./index.css";
import ReactShadowRoot from "react-shadow-root";
import { StyleSheetManager } from "styled-components";

class BankService extends HTMLElement {
  root;

  constructor() {
    super();
    // this.root = document.createElement("div");
    ReactDOM.createRoot(this).render(
      <ReactShadowRoot>
        <style>{style}</style>
        <App></App>
      </ReactShadowRoot>
    );
  }

  connectedCallback() {
    // this.appendChild(this.root);
  }
}

customElements.define("bank-service", BankService);
