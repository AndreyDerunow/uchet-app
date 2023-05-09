import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../redux/users";
import InversedABtn from "./inversedABtn";

const NavProfile = ({ toggleMenu, isOpen, active, onClick }) => {
    const currentUser = useSelector(getCurrentUserData());
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

NavProfile.propTypes = {
    toggleMenu: PropTypes.func,
    isOpen: PropTypes.bool,
    active: PropTypes.number,
    onClick: PropTypes.func
};

export default NavProfile;
