import React, { PropsWithChildren, useEffect } from "react";
import {
    getCategoriesDataStatus,
    getCategoriesLoadingStatus,
    loadCategoriesList
} from "../../redux/categories";

import {
    getCurrentUserId,
    getCurrentUserloadingStatus,
    getUsersIsLogedIn,
    loadCurrentUserData
} from "../../redux/users";
import Loader from "../ui/loader";
import { useAppDispatch, useAppSelector } from "../../redux/createStore";

const AppLoader = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch();
    const categoriesLoadingStatus = useAppSelector(
        getCategoriesLoadingStatus()
    );
    const categoriesLoaded = useAppSelector(getCategoriesDataStatus());
    const currentUserLoadingStatus = useAppSelector(
        getCurrentUserloadingStatus()
    );

    const isLoggedIn = useAppSelector(getUsersIsLogedIn());
    const currentUserId = useAppSelector(getCurrentUserId());
    useEffect(() => {
        dispatch(loadCategoriesList());
        if (isLoggedIn && !categoriesLoaded)
            dispatch(loadCurrentUserData(currentUserId));
    }, []);

    if (categoriesLoadingStatus || currentUserLoadingStatus) {
        return <Loader />;
    }

    if (!categoriesLoaded) {
        return <h1>Произошла ошибка при загрузке данных. Попробуйте позже</h1>;
    }
    if (categoriesLoaded) return children;
};

export default AppLoader;
