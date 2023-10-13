import React from "react";

const CategoryToolTip = ({ info, x, y }) => {
    if (x && y && info) {
        return (
            <div
                style={{ top: y, left: x }}
                className="font-bold text-2xl bg-transparent text-warmGray-50 text-center w-[150px] h-[75px] absolute z-50 "
            >
                <p>{info.part}</p>
                <p>{info.name}</p>
            </div>
        );
    }
};

export default CategoryToolTip;
