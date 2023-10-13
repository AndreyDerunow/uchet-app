import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "react-router-dom";

import { Provider } from "react-redux";
import history from "./app/utils/history";
import store from "./app/redux/createStore";
import App from "./App";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./app/components/pages/redirect/error";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Router history={history}>
        <Provider store={store}>
            <React.StrictMode>
                <ErrorBoundary FallbackComponent={Error}>
                    <App />
                </ErrorBoundary>
            </React.StrictMode>
        </Provider>
    </Router>
);
