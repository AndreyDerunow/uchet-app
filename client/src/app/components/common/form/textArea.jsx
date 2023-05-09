import React from "react";
import PropTypes from "prop-types";

const TextArea = ({
    id,
    name,
    label,
    placeholder,
    maxlength,
    onChange,
    value,
    error
}) => {
    return (
        <div className="p2 m-2 z-[1] w-full max-w-[400px] mx-auto">
            <label className="text-warmGray-50 ml-2 mx-4" htmlFor={id}>
                {label}
            </label>
            <textarea
                onChange={onChange}
                value={value}
                id={id}
                type="text"
                className="rounded-sm p-2 h-40 w-60"
                maxLength={maxlength}
                rows="5"
                cols="20"
                spellCheck="true"
                placeholder={placeholder}
                name={name}
            />
        </div>
    );
};

TextArea.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    maxlength: PropTypes.number
};
export default TextArea;
