import React from "react";
import history from "../../utils/history";
import { IHref } from "../../interfaces/interfaces";

const InversedABtn = ({ text, href, active, onClick }: IHref) => {
    const handleClick = () => {
        history.push(href || "/");
        onClick && onClick();
    };
    return (
        <div
            onClick={handleClick}
            role="button"
            className={
                (active === 3 ||
                (history.location.pathname.includes("profile") && active === -1)
                    ? "text-button"
                    : "text-warmGray-50") +
                " transition-all ease-in-out duration-300 relative bg-opacity-0 z-[1] hover:text-button textShadow"
            }
        >
            {" " + text}
        </div>
    );
};

export default InversedABtn;
