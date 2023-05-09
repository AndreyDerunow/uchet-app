import { createAction, createSlice } from "@reduxjs/toolkit";
import operationService from "../services/operation.service";
import history from "../utils/history";
import { toast } from "react-toastify";
import { updateUser } from "./users";

const operationsSlice = createSlice({
    name: "operations",
    initialState: {
        entities: null,
        isLoading: false,
        error: null,
        operationsDataLoaded: false
    },
    reducers: {
        operationsRequested: (state, action) => {
            state.isLoading = true;
        },
        operationsRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.operationsDataLoaded = true;
        },
        operationsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            state.operationsDataLoaded = false;
        },
        operationUpdated: (state, action) => {
            const updatedOperationindex = state.entities.findIndex(
                (o) => o._id === action.payload._id
            );
            state.entities[updatedOperationindex] = { ...action.payload };
        },
        operationRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (o) => o._id !== action.payload
            );
        },
        operationCreated: (state, action) => {
            state.entities.push(action.payload);
        }
    }
});

const { reducer: operationReducer, actions } = operationsSlice;
const {
    operationsRequested,
    operationsRecieved,
    operationsRequestFailed,
    operationUpdated,
    operationCreated,
    operationRemoved
} = actions;

const operationUpdateRequested = createAction(
    "operations/operationUpdateRequested"
);
const operationUpdateFailed = createAction("operations/operationUpdateFailed");
const operationRemoveRequested = createAction(
    "operations/operationRemoveRequested"
);
const operationRemoveFailed = createAction("operations/operationRemoveFailed");
const operationCreateRequested = createAction(
    "operations/operationCreateRequested"
);
const operationCreateFailed = createAction("operations/operationCreateFailed");
export const loadOperationsList = () => async (dispatch) => {
    dispatch(operationsRequested());
    try {
        const content = await operationService.fetchAll();
        dispatch(operationsRecieved(content));
    } catch (e) {
        dispatch(operationsRequestFailed(e.message));
    }
};

export const createOperation = (payload) => async (dispatch, getState) => {
    dispatch(operationCreateRequested());
    const { currentBalance, operations } = getState().users.currentUserData;
    try {
        const content = await operationService.create(payload);
        const updatedBalance =
            currentBalance +
            (content.type === "top up" ? +content.sum : -content.sum);

        dispatch(operationCreated(content));
        dispatch(
            updateUser({
                ...getState().users.currentUserData,
                currentBalance: updatedBalance,
                operations: [...operations, content._id]
            })
        );
        toast.success("Операция добавлена!");
    } catch (e) {
        dispatch(operationCreateFailed(e.message));
        toast.error(e.message);
    }
};

export const updateOperation =
    (data, redirectable) => async (dispatch, getState) => {
        dispatch(operationUpdateRequested());
        const currentBalance = getState().users.currentUserData.currentBalance;
        const currentOperation = getState().operations.entities.filter(
            (o) => o._id === data._id
        )[0];
        try {
            const content = await operationService.update(data);
            const prevOperation =
                currentOperation.type === "top up"
                    ? -currentOperation.sum
                    : +currentOperation.sum;
            const updateOperation =
                content.type === "top up" ? +content.sum : -content.sum;
            const updatedBalance =
                currentBalance + prevOperation + updateOperation;
            dispatch(operationUpdated(content));
            dispatch(
                updateUser({
                    ...getState().users.currentUserData,
                    currentBalance: updatedBalance
                })
            );
            toast.success("Операция обновлена!");
            redirectable && history.push("/operations");
        } catch (e) {
            dispatch(operationUpdateFailed(e.message));
            toast.error(e.message);
        }
    };

export const removeOperation = (operationId) => async (dispatch, getState) => {
    dispatch(operationRemoveRequested());
    const currentBalance = getState().users.currentUserData.currentBalance;
    const { type, sum } = getState().operations.entities.filter(
        (o) => o._id === operationId
    )[0];

    try {
        const content = await operationService.remove(operationId);
        if (!content) {
            dispatch(operationRemoved(operationId));
            const updatedBalance =
                currentBalance + (type === "top up" ? -sum : +sum);

            dispatch(
                updateUser({
                    ...getState().users.currentUserData,
                    currentBalance: updatedBalance
                })
            );
            toast.success("Операция удалена!");
        }
    } catch (e) {
        dispatch(operationRemoveFailed(e.message));
        toast.error(e.message);
    }
};

export const getCurrentUserOperations = () => (state) =>
    state.operations?.entities
        ? state.operations.entities.filter((o) => o.userId === state.users.auth)
        : null;
export const getOperationById = (id) => (state) =>
    state.operations.entities.find((o) => id === o._id);
export const getOperationsList = () => (state) => state.operations.entities;
export const getOperationsLoadingStatus = () => (state) =>
    state.operations.isLoading;
export const getOperationsLoaded = () => (state) =>
    state.operations.operationsDataLoaded;
export default operationReducer;
