import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import "./style/main.scss";
import configureStore, { history } from "./store";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

const Root = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
