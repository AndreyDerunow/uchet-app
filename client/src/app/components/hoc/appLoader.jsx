import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const categoriesLoadingStatus = useSelector(getCategoriesLoadingStatus());
    const categoriesLoaded = useSelector(getCategoriesDataStatus());
    const currentUserLoadingStatus = useSelector(getCurrentUserloadingStatus());

    const isLoggedIn = useSelector(getUsersIsLogedIn);
    const currentUserId = useSelector(getCurrentUserId());
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
