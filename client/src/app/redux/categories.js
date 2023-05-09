import { createAction, createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";
import { toast } from "react-toastify";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
        dataLoaded: false
    },
    reducers: {
        categoriesRequested: (state, action) => {
            state.isLoading = true;
        },
        categoriesRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        categoriesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            state.dataLoaded = false;
        },
        categoryUpdated: (state, action) => {
            const updatedOperationindex = state.entities.findIndex(
                (o) => o._id === action.payload._id
            );
            state.entities[updatedOperationindex] = { ...action.payload };
        },
        categoryRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (o) => o._id !== action.payload._id
            );
        },
        categoryCreated: (state, action) => {
            state.entities.push(action.payload);
        }
    }
});

const { reducer: categoryReducer, actions } = categoriesSlice;
const {
    categoriesRequested,
    categoriesRecieved,
    categoriesRequestFailed,
    categoryUpdated,
    categoryCreated,
    categoryRemoved
} = actions;

const categoryUpdateRequested = createAction(
    "categories/operationUpdateRequested"
);
const categoryUpdateFailed = createAction("categories/operationUpdateFailed");
const categoryRemoveRequested = createAction(
    "categories/operationRemoveRequested"
);
const categoryRemoveFailed = createAction("categories/operationRemoveFailed");
const categoryCreateRequested = createAction(
    "categories/operationCreateRequested"
);
const categoryCreateFailed = createAction("categories/operationCreateFailed");
export const loadCategoriesList = () => async (dispatch) => {
    dispatch(categoriesRequested());
    try {
        const content = await categoryService.fetchAll();

        dispatch(categoriesRecieved(content));
    } catch (e) {
        dispatch(categoriesRequestFailed(e.message));
    }
};

export const createCategory = (payload) => async (dispatch) => {
    dispatch(categoryCreateRequested());
    try {
        const content = await categoryService.create(payload);
        dispatch(categoryCreated(content));
        toast.success("Категория создана!");
    } catch (e) {
        dispatch(categoryCreateFailed(e.message));
        toast.error(e.message);
    }
};

export const updateCategory = (payload) => async (dispatch) => {
    dispatch(categoryUpdateRequested());
    try {
        const content = await categoryService.update(payload);

        dispatch(categoryUpdated(content));
        toast.success("Категория обновлена!");
    } catch (e) {
        dispatch(categoryUpdateFailed(e.message));
        toast.error(e.message);
    }
};

export const removeCategory = (categoryId) => async (dispatch) => {
    dispatch(categoryRemoveRequested());
    try {
        const content = await categoryService.delete(categoryId);
        if (!content) {
            dispatch(categoryRemoved(categoryId));
            toast.success("Категория удалена!");
        }
    } catch (e) {
        dispatch(categoryRemoveFailed(e.message));
        toast.error(e.message);
    }
};

export const getCurrentUserCategories = () => (state) =>
    state.categories.entities
        ? state.categories.entities.filter(
              (c) => c.creator === state.users.auth || c.default
          )
        : null;
export const getCategoriesList = () => (state) => state.categories.entities;
export const getCategoriesLoadingStatus = () => (state) =>
    state.categories.isLoading;
export const getCategoriesDataStatus = () => (state) =>
    state.categories.dataLoaded;

export default categoryReducer;
