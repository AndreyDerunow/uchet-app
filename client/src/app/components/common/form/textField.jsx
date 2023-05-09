import React from "react";
import PropTypes from "prop-types";
import formatePhone from "../../../utils/formatePhone";

const TextField = ({
    id,
    name,
    placeholder,
    label,
    value,
    onChange,
    type = "text",
    error
}) => {
    const handleChange = ({ target }) => {
        if (type === "phone" || type === "number") {
            const currentVal = target.value.replaceAll(/\D/gm, "");

            onChange({ target: { name, value: currentVal } });
        } else {
            onChange({ target: { name, value: target.value } });
        }
    };

    return (
        <div className="p2 m-2 z-[1] w-full max-w-[400px] mx-auto">
            <label className=" text-warmGray-50 mx-2 mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                onChange={handleChange}
                onPaste={handleChange}
                value={type === "phone" ? formatePhone(value) : value}
                id={id}
                type={type}
                maxLength={type === "phone" ? 15 : 30}
                className="rounded-sm p-2 w-full"
                name={name}
                placeholder={placeholder}
            />

            {error && <span className="text-red-500 errorShadow">{error}</span>}
        </div>
    );
};

TextField.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    error: PropTypes.string
};
export default TextField;
