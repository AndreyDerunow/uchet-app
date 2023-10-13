import React, { ClipboardEvent, ClipboardEventHandler } from "react";
import formatePhone from "../../../utils/formatePhone";
import { PropsWithFunc } from "../../../interfaces/interfaces";

const TextField = ({
    id,
    name,
    placeholder,
    label,
    value,
    onChange,
    type = "text",
    error
}: PropsWithFunc) => {
    const handleChange = ({
        target
    }:
        | React.ChangeEvent<HTMLInputElement>
        | ClipboardEvent<HTMLInputElement>) => {
        if (type === "phone" || type === "number") {
            const currentVal = (target as HTMLInputElement).value.replaceAll(
                /\D/gm,
                ""
            );

            onChange && onChange({ target: { name, value: currentVal } });
        } else {
            onChange &&
                onChange({
                    target: { name, value: (target as HTMLInputElement).value }
                });
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
                value={type !== "phone" ? value : value && formatePhone(value)}
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

export default TextField;
