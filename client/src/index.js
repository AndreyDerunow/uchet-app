import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Router } from "react-router-dom";
import { createStore } from "./app/redux/createStore";
import { Provider } from "react-redux";
import history from "./app/utils/history";

const store = createStore();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router history={history}>
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
    </Router>
);
