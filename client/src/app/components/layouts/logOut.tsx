import React, { useEffect } from "react";
import Loader from "../ui/loader";
import { logOut } from "../../redux/users";
import { useAppDispatch } from "../../redux/createStore";

const LogOut = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(logOut());
    }, []);
    return <Loader />;
};

export default LogOut;
