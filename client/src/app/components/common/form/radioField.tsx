import React from "react";
import { InputProps } from "../../../interfaces/interfaces";

const RadioField = ({ label, options, onChange, name, value }: InputProps) => {
    return (
        <div className="text-warmGray-50 p2 m-2 w-full z-[1] mx-auto">
            <label className="block mx-2 pb-4">{label}</label>
            <div className="flex justify-center text-center">
                {options &&
                    options.map((o) => (
                        <div key={o.name + " " + o.value}>
                            <input
                                className="hidden"
                                type="radio"
                                name={name}
                                value={o.value}
                                checked={o.value === value}
                                id={o.name + " " + o.value}
                                onChange={onChange}
                            />
                            <label
                                className={
                                    "border  border-warmGray-50 p-4 text-3xl inline-block w-[90px] cursor-pointer radio transition-all " +
                                    (o.name === "+"
                                        ? "text-green-500 rounded-l-lg"
                                        : "text-red-500 rounded-r-lg")
                                }
                                htmlFor={o.name + " " + o.value}
                            >
                                {o.name}
                            </label>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RadioField;
