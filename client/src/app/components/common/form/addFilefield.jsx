import React from "react";

const AddFileField = ({ onChange, value, id, name }) => {
    const handleChange = (e) => {
        const file = e.target.files[0];
        const img = window.URL.createObjectURL(file).toString();
        return onChange({ target: { name, value: file, img } });
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
