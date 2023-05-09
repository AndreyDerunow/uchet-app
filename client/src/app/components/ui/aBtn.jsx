import React from "react";
import PropTypes from "prop-types";

const ABtn = ({ text, onClick }) => {
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

ABtn.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default ABtn;
