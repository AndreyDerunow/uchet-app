import React from "react";
import PropTypes from "prop-types";

const Form = ({ children, onSubmit }) => {
    return (
        <form
            onSubmit={onSubmit}
            className="text-black grid py-7 my-7 col-start-3 col-span-8 place-content-center bg-transparent relative border-solid border-2 border-warmGray-50 rounded
before:content-[''] before:absolute before:block before:h-full before:bg-opacity-5 before:top-0 
            before:w-full  before:left-0 before:border-solid before:border-2 before:border-warmGray-50 before:rounded before:origin-center before:rotate-1 before:z-[0]"
        >
            {children}
        </form>
    );
};

Form.propTypes = {
    onSubmit: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default Form;
