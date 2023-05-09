import { configureStore, combineReducers } from "@reduxjs/toolkit";
import operationReducer from "./operations";
import categoryReducer from "./categories";
import usersReducer from "./users";

const rootReduser = combineReducers({
    operations: operationReducer,
    categories: categoryReducer,
    users: usersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReduser
    });
}
