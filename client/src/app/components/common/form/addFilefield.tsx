import React, { SyntheticEvent } from "react";
import { IimgData, PropsWithFunc } from "../../../interfaces/interfaces";

const AddFileField = ({ onChange, value, id, name }: PropsWithFunc) => {
    const handleChange = (e: SyntheticEvent) => {
        const file = (e.target as HTMLFormElement).files[0];
        const img = window.URL.createObjectURL(file).toString();
        if (name) {
            const imgData: IimgData = { target: { name, value: file, img } };
            return onChange && onChange(imgData);
        }
    };
    return (
        <div className="text-warmGray-50 p-2 m-2 z-[1] w-full max-w-[400px] mx-auto ">
            <label className="pb-4 flex justify-start" htmlFor={id}>
                Фото{" "}
                <div
                    style={{ backgroundImage: `url(${value})` }}
                    className="mx-auto bg-contain bg-no-repeat bg-center w-40 h-40 flex justify-center items-center text-warmGray-50 text-4xl border border-warmGray-50 rounded-sm cursor-pointer"
                >
                    +
                </div>
            </label>
            <input
                className="hidden"
                accept="image/*"
                onChange={handleChange}
                type="file"
                name={name}
                id={id}
            />
        </div>
    );
};

export default AddFileField;
