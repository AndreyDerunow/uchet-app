import React, { PropsWithChildren, useEffect } from "react";
import {
    loadOperationsList,
    getOperationsLoadingStatus,
    getOperationsLoaded
} from "../../redux/operations";
import Loader from "../ui/loader";
import { getUsersIsLogedIn } from "../../redux/users";
import Unauthorized from "../pages/redirect/unauthorized";
import { useAppDispatch, useAppSelector } from "../../redux/createStore";

const OperationsLoader = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(getUsersIsLogedIn());
    const operationsLoadingStatus = useAppSelector(
        getOperationsLoadingStatus()
    );
    const operationsLoaded = useAppSelector(getOperationsLoaded());
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
