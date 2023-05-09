import React from "react";
// import Loader from "../../ui/loader";
import { getCategoriesList } from "../../redux/categories";
import { useSelector } from "react-redux";
import { BsGlobeAmericas } from "react-icons/bs";
import formateDate from "../../utils/formateDate";

const Tooltip = ({ info, x, y, balance }) => {
    const categories = useSelector(getCategoriesList());

    if (x && y) {
        if (info && info.begin) {
            return (
                <div
                    style={{ top: y, left: x }}
                    className="font-bold bg-transparent text-warmGray-50 text-center w-[150px] h-[75px] absolute z-50 "
                >
                    <p>{formateDate(info.createdAt)}</p>
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

        const tooltipCategoryName = categories.find(
            (c) => c._id === category
        ).name;
        const tooltipType = (type === "top up" ? "+" : "-") + sum;
        return (
            <div
                style={{ top: y, left: x }}
                className="font-bold bg-transparent text-warmGray-50 text-center w-[150px] h-[75px] absolute z-50 "
            >
                <p>{tooltipType}</p>
                <p>{formateDate(created_at)}</p>
                <p>{tooltipCategoryName}</p>
                <p>{comment}</p>
                <p>баланс: {balance}</p>
            </div>
        );
    }
};

export default Tooltip;
