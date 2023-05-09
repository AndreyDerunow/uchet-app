import React, { useEffect } from "react";
import Loader from "../ui/loader";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/users";

const LogOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
    }, []);
    return <Loader />;
};

export default LogOut;
