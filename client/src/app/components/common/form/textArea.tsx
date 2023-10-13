import React from "react";
import { PropsTextArea } from "../../../interfaces/interfaces";

const TextArea = ({
    id,
    name,
    label,
    placeholder,
    maxlength,
    onChange,
    value
}: PropsTextArea) => {
    return (
        <div className="p2 m-2 z-[1] w-full max-w-[400px] mx-auto">
            <label className="text-warmGray-50 ml-2 mx-4" htmlFor={id}>
                {label}
            </label>
            <textarea
                onChange={onChange}
                value={value}
                id={id}
                className="rounded-sm p-2 h-40 w-60"
                maxLength={maxlength}
                rows={5}
                cols={20}
                spellCheck="true"
                placeholder={placeholder}
                name={name}
            />
        </div>
    );
};

export default TextArea;
