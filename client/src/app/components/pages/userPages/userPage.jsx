import React from "react";
import UserForm from "./userForm";
import UserProfile from "./userProfile";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../../redux/users";

const User = () => {
    const { action } = useParams();
    const currentUser = useSelector(getCurrentUserData());

    return action === "edit" ? (
        <UserForm currentUser={currentUser} />
    ) : (
        <UserProfile />
    );
};

export default User;
