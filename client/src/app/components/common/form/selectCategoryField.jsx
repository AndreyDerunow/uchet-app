import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as icons from "react-icons/bs";
import { useSelector } from "react-redux";
import { getCurrentUserCategories } from "../../../redux/categories";
import history from "../../../utils/history";

const SelectCategoryField = ({
    label,
    value,
    onChange,
    id,
    name,
    onAddCategory
}) => {
    // const currentId =
    const [isOpen, setIsOpen] = useState(false);
    const [chosenCategory, setCategory] = useState(null);
    useEffect(() => {
        if (value) {
            const category = currenUserCategories.find((c) => c._id === value);
            setCategory({ ...category });
        } else {
            setCategory(null);
        }
    }, [value]);

    const currenUserCategories = useSelector(getCurrentUserCategories());

    const handleChose = ({ target }) => {
        if (!(target.dataset.icon || target.closest("div[data-icon]"))) {
            setIsOpen(false);
            onAddCategory();
            return;
        }
        const categoryName = target.dataset.icon
            ? target.innerText
            : target.closest("div[data-icon]").innerText;

        const category = currenUserCategories.find(
            (c) => c.name === categoryName.trim()
        );
        setIsOpen((prev) => !prev);
        setCategory({ ...category });
        onChange({ target: { name, value: category._id } });
    };

    // console.log("chosenCategory", chosenCategory);
    return (
        <div className="text-warmGray-50 p2 m-2 z-[2] w-full relative mx-auto">
            <label htmlFor={name} className="block mx-2">
                {label}
            </label>
            <div
                className="text-warmGray-50 w-full border-b border-b-gray-200 p-2 flex items-center justify-start cursor-pointer rounded-t-sm bg-warmGray-50 h-[40px]"
                onClick={() => {
                    setIsOpen((prev) => !prev);
                }}
                id={id}
                name={name}
                value={value}
            >
                {chosenCategory ? (
                    <div
                        style={{ backgroundColor: chosenCategory.color }}
                        className="w-full cursor-pointer text-black bg-warmGray-50 border-b border-b-gray-200 border-r-4  border-r-warmGray-50 border-l-4 border-l-warmGray-50"
                    >
                        <span>{icons[chosenCategory.icon]()} </span>
                        {chosenCategory.name}
                    </div>
                ) : (
                    <div className="text-gray-400">Выберите категорию...</div>
                )}
                <div
                    className={
                        "arrow-icon transition-all" +
                        (isOpen ? " rotate-180" : "")
                    }
                ></div>
            </div>
            <div
                className={
                    (isOpen ? "block h-20" : "h-0 hidden") +
                    " z-2 w-full absolute rounded-b-sm text-center overflow-auto transition-all"
                }
            >
                {currenUserCategories.map((c) => {
                    return (
                        <div
                            key={Math.random() + c.icon}
                            style={{ backgroundColor: c.color }}
                            className="w-full cursor-pointer text-black bg-white border-b border-b-gray-200 border-r-4  border-r-white border-l-4 border-l-white"
                            onClick={handleChose}
                            data-icon={c.icon}
                        >
                            <span>{icons[c.icon]()} </span>
                            {c.name}
                        </div>
                    );
                })}

                <div
                    className="w-full cursor-pointer text-black bg-white border-b border-b-gray-200 border-r-4  border-r-white border-l-4 border-l-white"
                    onClick={handleChose}
                >
                    <span>{icons["BsClipboard2"]()} </span>
                    Создать новую
                </div>
            </div>
        </div>
    );
};

SelectCategoryField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string
};

export default SelectCategoryField;
