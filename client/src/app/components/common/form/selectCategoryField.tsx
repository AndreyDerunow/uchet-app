import React, { useEffect, useState } from "react";
import * as icons from "react-icons/bs";
import { getCurrentUserCategories } from "../../../redux/categories";
import { useAppSelector } from "../../../redux/createStore";
import { ICategory, PropsWithFunc } from "../../../interfaces/interfaces";

const SelectCategoryField = ({
    label,
    value,
    onChange,
    id,
    name,
    onAddCategory
}: PropsWithFunc) => {
    const [isOpen, setIsOpen] = useState(false);
    const [chosenCategory, setCategory] = useState<ICategory | null>(null);
    useEffect(() => {
        if (value && currenUserCategories) {
            const category = currenUserCategories.find((c) => c._id === value);
            setCategory({ ...category });
        } else {
            setCategory(null);
        }
    }, [value]);

    const currenUserCategories = useAppSelector(getCurrentUserCategories());
    //Todo: убрать эни постараться
    //Todo: шляпа какая-то тут в типизации
    const handleChose = ({ target }: React.MouseEvent) => {
        if (
            !(
                (target as HTMLElement).dataset.icon ||
                (target as HTMLElement).closest("div[data-icon]")
            )
        ) {
            setIsOpen(false);
            onAddCategory && onAddCategory();
            return;
        }
        const categoryName = (target as HTMLElement).dataset.icon
            ? (target as HTMLElement).innerText
            : ((target as HTMLElement).closest("div[data-icon]") as HTMLElement)
                  .innerText;

        const category =
            currenUserCategories &&
            currenUserCategories.find((c) => c.name === categoryName.trim());
        setIsOpen((prev) => !prev);
        setCategory({ ...category });
        onChange && onChange({ target: { name, value: category._id } });
    };

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
            >
                {chosenCategory ? (
                    <div
                        style={{ backgroundColor: chosenCategory.color }}
                        className="w-full cursor-pointer text-black bg-warmGray-50 border-b border-b-gray-200 border-r-4  border-r-warmGray-50 border-l-4 border-l-warmGray-50"
                    >
                        <span>{(icons as any)[chosenCategory.icon]()} </span>
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
                {currenUserCategories &&
                    currenUserCategories.map((c) => {
                        return (
                            <div
                                key={Math.random() + c.icon}
                                style={{ backgroundColor: c.color }}
                                className="w-full cursor-pointer text-black bg-white border-b border-b-gray-200 border-r-4  border-r-white border-l-4 border-l-white"
                                onClick={handleChose}
                                data-icon={c.icon}
                            >
                                <span>{(icons as any)[c.icon]()} </span>
                                {c.name}
                            </div>
                        );
                    })}

                <div
                    className="w-full cursor-pointer text-black bg-white border-b border-b-gray-200 border-r-4  border-r-white border-l-4 border-l-white"
                    onClick={handleChose}
                >
                    <span>{icons["BsClipboard2"]({})} </span>
                    Создать новую
                </div>
            </div>
        </div>
    );
};

export default SelectCategoryField;
