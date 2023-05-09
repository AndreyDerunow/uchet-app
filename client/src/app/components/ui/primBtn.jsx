import React from "react";
import PropTypes from "prop-types";

const PrimBtn = ({ text, type, onClick, disabled }) => {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={
                (disabled
                    ? "bg-gradient-to-b from-thirdColor to-secColor "
                    : "cursor-pointer bg-gradient-to-b from-buttonBottom to-button hover:shadow-[0px_0px_20px_5px_#9F3ED5]") +
                " mt-3 mx-auto p-2 transition-all ease-in-out duration-300 w-40  text-white rounded-md z-[1]  "
            }
        >
            {" " + text}
        </button>
    );
};

PrimBtn.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string.isRequired
};

export default PrimBtn;
