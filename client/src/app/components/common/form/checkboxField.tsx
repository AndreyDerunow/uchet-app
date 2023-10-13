import React from "react";
import PropTypes from "prop-types";
import { PropsBoolValue } from "../../../interfaces/interfaces";

const CheckboxField = ({
    label,
    name,
    id,
    onChange,
    value
}: PropsBoolValue) => {
    return (
        <div className="p2 m-2 mb-0 z-[1] relative h-24 w-full max-w-[400px] mx-auto">
            <label className="text-warmGray-50 m-3 ml-2" htmlFor={id}>
                {label}
            </label>

            <input
                onChange={onChange}
                id={id}
                type="checkbox"
                checked={value}
                className="cursor-pointer opacity-0 absolute h-20 w-24 top-0 z-[1] right-6"
                name={name}
            />
            <span className="checkbox absolute h-20 top-0 right-10 w-20"></span>
        </div>
    );
};

CheckboxField.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    label: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string
};

export default CheckboxField;
