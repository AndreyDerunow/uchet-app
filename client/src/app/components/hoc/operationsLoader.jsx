import React, { useEffect } from "react";
import {
    loadOperationsList,
    getOperationsLoadingStatus,
    getOperationsLoaded
} from "../../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../ui/loader";
import { getUsersIsLogedIn } from "../../redux/users";
import Unauthorized from "../pages/redirect/unauthorized";

const OperationsLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getUsersIsLogedIn());
    const operationsLoadingStatus = useSelector(getOperationsLoadingStatus());
    const operationsLoaded = useSelector(getOperationsLoaded());
    useEffect(() => {
        if (isLoggedIn && !operationsLoaded) {
            dispatch(loadOperationsList());
        }
    }, [isLoggedIn, operationsLoadingStatus]);

    if (!isLoggedIn) {
        return <Unauthorized />;
    }
    if (operationsLoadingStatus) return <Loader />;
    if (operationsLoaded) return children;
};

export default OperationsLoader;
