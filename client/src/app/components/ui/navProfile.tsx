import React from "react";
import { getCurrentUserData } from "../../redux/users";
import InversedABtn from "./inversedABtn";
import { useAppSelector } from "../../redux/createStore";
import { INavProfileProps } from "../../interfaces/interfaces";

const NavProfile = ({
    toggleMenu,
    isOpen,
    active,
    onClick
}: INavProfileProps) => {
    const currentUser = useAppSelector(getCurrentUserData());
    return (
        <div className="relative">
            <div
                onClick={toggleMenu}
                className="flex items-center justify-evenly cursor-pointer"
            >
                <img
                    alt={currentUser.name}
                    className="rounded-full w-14 h-14"
                    src={currentUser.image}
                />
                <div
                    className={
                        "arrow-icon transition-all" +
                        (isOpen ? " rotate-180" : "")
                    }
                ></div>
                <p>{currentUser.name}</p>
            </div>
            <div
                className={
                    "absolute text-center w-full z-10 transition-all " +
                    (isOpen ? "block" : "hidden")
                }
            >
                <div>
                    <InversedABtn
                        onClick={onClick}
                        active={active}
                        text="profile"
                        href={`/user/${currentUser._id}/profile`}
                    />
                </div>
                <div>
                    <InversedABtn text="log out" href="/logOut" />
                </div>
            </div>
        </div>
    );
};

export default NavProfile;
