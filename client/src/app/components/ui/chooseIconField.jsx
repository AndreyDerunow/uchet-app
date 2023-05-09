import React from "react";

import MemoizedIconsList from "./iconsList";

const ChooseIcon = ({ chosenIcon, id, label, name, onChange }) => {
    const toggleIcon = ({ target }) => {
        const iconFunc =
            target === "svg"
                ? target?.parentNode?.dataset.icon
                : target?.closest("svg")?.parentNode.dataset.icon;
        onChange({ target: { name: "icon", value: iconFunc } });
    };

    return (
        <div className="text-white p2 m-2 z-[1] max-w-[400px] mx-auto">
            <label className=" text-white mx-2" htmlFor={id}>
                {label}
            </label>
            <div
                name={name}
                id={id}
                onClick={toggleIcon}
                className="flex p-4 h-32 flex-row gap-4 flex-wrap overflow-auto rounded-sm border border-white"
            >
                <MemoizedIconsList chosenIcon={chosenIcon} />
            </div>
        </div>
    );
};

export default ChooseIcon;
