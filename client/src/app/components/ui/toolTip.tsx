import React from "react";
import { getCategoriesList } from "../../redux/categories";
import { BsGlobeAmericas } from "react-icons/bs";
import formateDate from "../../utils/formateDate";
import { useAppSelector } from "../../redux/createStore";

const Tooltip = ({ info, x, y, balance }) => {
    const categories = useAppSelector(getCategoriesList());

    if (x && y) {
        if (info && info.begin) {
            return (
                <div
                    style={{ top: y, left: x }}
                    className="font-bold bg-transparent text-warmGray-50 text-center w-[150px] h-[75px] absolute z-50 "
                >
                    <p>{formateDate(info.createdAt, false)}</p>
                    <p>регистрация</p>
                    <p>С этого всё начинается)</p>
                    <p></p>
                    <p>баланс: 0</p>
                </div>
            );
        }
        if (!info)
            return (
                <div
                    style={{ top: y, left: x }}
                    className="bg-transparent text-warmGray-50 text-center w-[150px] h-[75px] absolute z-50 "
                >
                    <BsGlobeAmericas className="animate-spinFetch h-5 w-5 mr-1 text-warmGray-50" />
                    Searching...
                </div>
            );

        const { category, type, comment, sum, created_at } = info;

        const tooltipCategoryName =
            categories && categories.find((c) => c._id === category).name;
        const tooltipType = (type === "top up" ? "+" : "-") + sum;
        return (
            <div
                style={{ top: y, left: x }}
                className="font-bold bg-transparent text-warmGray-50 text-center w-[150px] h-[75px] absolute z-50 "
            >
                <p>{tooltipType}</p>
                <p>{formateDate(created_at, false)}</p>
                <p>{tooltipCategoryName}</p>
                <p>{comment}</p>
                <p>баланс: {balance}</p>
            </div>
        );
    }
};

export default Tooltip;
