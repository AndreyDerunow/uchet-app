import React from "react";
import UserForm from "./userForm";
import { useParams } from "react-router-dom";
import { getCurrentUserData } from "../../../redux/users";
import UserProfile from "./userProfile";
import { useAppSelector } from "../../../redux/createStore";

const User = () => {
    const { action } = useParams();
    const currentUser = useAppSelector(getCurrentUserData());

    return action === "edit" ? (
        <UserForm
            currentUser={currentUser}
            backable={false}
            redirectable={false}
        />
    ) : (
        <UserProfile />
    );
};

export default User;
