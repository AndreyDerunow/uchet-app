import { Dispatch, createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import generateAuthError from "../utils/generateAuthErrorMessge";
import history from "../utils/history";
import { toast } from "react-toastify";
import { RootState } from "./createStore";

type User = any;

interface Users {
    entities: User[] | null;
    error: string[] | null;
    isLoading: boolean;
    auth: string | null;
    isLogedIn: boolean;
    currentUserLoading: boolean;
    currentUserData: User | null;
    usersDataLoaded: boolean;
}

const initialState: Users = localStorageService.getAccessToken()
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
        authRequested: (state) => {
            state.error = null;
        },
        userDataRequested: (state) => {
            state.currentUserLoading = true;
        },
        userDataRecieved: (state, action) => {
            state.currentUserData = action.payload;
            state.currentUserLoading = false;
        },
        userDataRequestFailed: (state) => {
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
        userlogedOut: (state) => {
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
            if (state.entities) {
                state.entities = state.entities.filter(
                    (e) => e._id !== action.payload._id
                );
                state.currentUserData = null;
            }
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

//Todo: типизировать пайлоады

export const SignUp = (payload) => async (dispatch: Dispatch) => {
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
export const loadCurrentUserData = (userId) => async (dispatch: Dispatch) => {
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
    async (dispatch: Dispatch) => {
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

export const logOut = () => (dispatch: Dispatch) => {
    localStorageService.removeAuth();
    dispatch(userlogedOut());
    history.push("/");
};

export const updateUser =
    (data, redirectable: boolean = false) =>
    async (dispatch: Dispatch) => {
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

export const removeUser = (userId: string) => async (dispatch: Dispatch) => {
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

export const getUsersList = () => (state: RootState) => state.users.entities;
export const getUsersloadingStatus = () => (state: RootState) =>
    state.users.isLoading;
export const getCurrentUserloadingStatus = () => (state: RootState) =>
    state.users.currentUserLoading;
export const getUsersIsLogedIn = () => (state: RootState) =>
    state.users.isLogedIn;
export const getCurrentUserData = () => (state: RootState) =>
    state.users.currentUserData;
export const getUsersDataLoaded = () => (state: RootState) =>
    state.users.usersDataLoaded;
export const getUserById = (id: string) => (state: RootState) =>
    state.users.entities
        ? state.users.entities.find((u) => u._id === id)
        : null;
export const getCurrentUserId = () => (state: RootState) => state.users.auth;
export const getAuthErrors = () => (state: RootState) => state.users.error;
export default usersReducer;
