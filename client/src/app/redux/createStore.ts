import { configureStore, combineReducers } from "@reduxjs/toolkit";
import operationReducer from "./operations";
import categoryReducer from "./categories";
import usersReducer from "./users";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReduser = combineReducers({
    operations: operationReducer,
    categories: categoryReducer,
    users: usersReducer
});

const store = configureStore({
    reducer: rootReduser
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
