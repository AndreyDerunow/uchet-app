import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import generateAuthError from "../utils/generateAuthErrorMessge";
import history from "../utils/history";
import { toast } from "react-toastify";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          error: null,
          isLoading: true,
          auth: localStorageService.getUserId(),
          isLogedIn: true,
          currentUserLoading: false,
          currentUserData: null,
          usersDataLoaded: false
      }
    : {
          entities: null,
          error: null,
          isLoading: true,
          auth: null,
          isLogedIn: false,
          currentUserLoading: false,
          currentUserData: null,
          usersDataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        authRequested: (state, action) => {
            state.error = null;
        },
        userDataRequested: (state, action) => {
            state.currentUserLoading = true;
        },
        userDataRecieved: (state, action) => {
            state.currentUserData = action.payload;
            state.currentUserLoading = false;
        },
        userDataRequestFailed: (state, action) => {
            state.currentUserLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload.userId;
            state.isLogedIn = true;
            state.currentUserData = action.payload.data;
        },
        authRequestFailed: (state, action) => {
            state.auth = null;
            state.error = action.payload;
        },
        userlogedOut: (state, action) => {
            state.entities = null;
            state.isLogedIn = false;
            state.auth = null;
        },
        userUpdated: (state, action) => {
            if (state.entities) {
                const updatedUserIndex = state.entities.findIndex(
                    (u) => u._id === action.payload._id
                );
                state.entities[updatedUserIndex] = action.payload;
            }

            state.currentUserData = action.payload;
        },
        userRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (e) => e._id !== action.payload._id
            );
            state.currentUserData = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;

const {
    userRemoved,
    userUpdated,
    userlogedOut,
    authRequestFailed,
    authRequestSuccess,
    authRequested,
    userDataRequested,
    userDataRecieved,
    userDataRequestFailed
} = actions;

const userRemoveRequested = createAction("users/userRemoveRequested");
const userRemoveFailed = createAction("users/userRemoveFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const SignUp = (payload) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const content = await authService.signUp(payload);
        localStorageService.setTokens(content);

        const data = await userService.getById(content.userId);
        dispatch(authRequestSuccess({ userId: content.userId, data }));

        history.push(`/user/${content.userId}/profile`);
    } catch (e) {
        const { code, message } = e;
        code === 400
            ? dispatch(authRequestFailed(generateAuthError(message)))
            : dispatch(authRequestFailed(e.message));
        toast.error(code === 400 ? generateAuthError(message) : e.message);
    }
};
export const loadCurrentUserData = (userId) => async (dispatch) => {
    if (userId === null) return;
    dispatch(userDataRequested());

    try {
        const data = await userService.getById(userId);

        dispatch(userDataRecieved(data));
    } catch (e) {
        dispatch(userDataRequestFailed(e.message));
        toast.error(e.message);
    }
};

export const SignIn =
    ({ email, password }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const content = await authService.logIn({ email, password });
            localStorageService.setTokens(content);
            const data = await userService.getById(content.userId);

            dispatch(authRequestSuccess({ userId: content.userId, data }));
            history.push(sessionStorage.getItem("redirect") || "/operations");
        } catch (e) {
            const { code, message } = e.response.data;
            code === 400
                ? dispatch(authRequestFailed(generateAuthError(message)))
                : dispatch(authRequestFailed(e.message));
            toast.error(code === 400 ? generateAuthError(message) : e.message);
        }
    };

export const logOut = () => (dispatch) => {
    localStorageService.removeAuth();
    dispatch(userlogedOut());
    history.push("/");
};

export const updateUser = (data, redirectable) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const content = await userService.update(data);
        dispatch(userUpdated(content));
        toast.success("Информация обновлена");
        redirectable && history.push(`/user/${content.userId}/profile`);
    } catch (e) {
        dispatch(userUpdateFailed(e.message));
        toast.error(e.message);
    }
};

export const removeUser = (userId) => async (dispatch) => {
    dispatch(userRemoveRequested());
    try {
        const content = await userService.delete(userId);
        if (!content) {
            dispatch(userRemoved(userId));
        }
    } catch (e) {
        dispatch(userRemoveFailed(e.message));
    }
};

export const getUsersList = () => (state) => state.users.entities;
export const getUsersloadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserloadingStatus = () => (state) =>
    state.users.currentUserLoading;
export const getUsersIsLogedIn = () => (state) => state.users.isLogedIn;
export const getCurrentUserData = () => (state) => state.users.currentUserData;
export const getUsersDataLoaded = () => (state) => state.users.usersDataLoaded;
export const getUserById = (id) => (state) =>
    state.users.entities
        ? state.users.dentities.find((u) => u._id === id)
        : null;
export const getCurrentUserId = () => (state) => state.users.auth;
export const getAuthErrors = () => (state) => state.users.error;
export default usersReducer;
