import React, { useRef } from "react";
import PropTypes from "prop-types";
import { PropsWithFunc } from "../../../interfaces/interfaces";

const ColorField = ({ value, label, onChange, id, name }: PropsWithFunc) => {
    const colorInput = useRef(null);
    let debounce: number;
    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        if (target) {
            clearTimeout(debounce);
            debounce = +setTimeout(() => {
                return (
                    onChange &&
                    onChange({ target: { name: id, value: target.value } })
                );
            }, 500);
        }
    };
    return (
        <div className="text-warmGray-50 p2 m-2 mb-5 w-full max-w-[400px] mx-auto relative">
            <label className="mx-2 pb-4 w-full" htmlFor="color">
                {label}
                <div className="w-5 h-5 rounded-full"></div>
            </label>
            <input
                ref={colorInput}
                onChange={handleChange}
                type="color"
                name={name}
                id={id}
                className="h-0 w-48 absolute left-1/2 top-[-1rem] translate-x-[-50%] opacity-0"
            />
            <div
                onClick={() => {
                    if (colorInput.current)
                        return (colorInput.current as HTMLElement).click();
                }}
                style={{ backgroundColor: value }}
                className=" cursor-pointer top-[80%] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[4rem] absolute h-[4rem] border border-warmGray-50 rounded-full"
            ></div>
        </div>
    );
};

ColorField.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string
};

export default ColorField;
