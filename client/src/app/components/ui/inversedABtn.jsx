import React from "react";
import PropTypes from "prop-types";
import history from "../../utils/history";

const InversedABtn = ({ text, href, active, onClick }) => {
    const handleClick = () => {
        history.push(href || "/");
        if (onClick) onClick();
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

InversedABtn.propTypes = {
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
    active: PropTypes.number,
    onClick: PropTypes.func
};

export default InversedABtn;
