import React from "react";
import { IButton } from "../../interfaces/interfaces";

const ABtn = ({ text, onClick }: IButton) => {
    return (
        <a
            onClick={onClick}
            role="button"
            href="#"
            className={
                "text-button transition-all ease-in-out duration-300 relative bg-opacity-0 z-[1] hover:text-warmGray-50 textShadow"
            }
        >
            {" " + text}
        </a>
    );
};

export default ABtn;
