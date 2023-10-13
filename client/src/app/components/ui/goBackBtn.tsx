import React from "react";
import history from "../../utils/history";

const GoBackBtn = () => {
    return (
        <button
            type="button"
            onClick={history.goBack}
            className="mt-3 col-start-2 w-40 h-[40px] mx-auto p-2 transition-all ease-in-out duration-300 bg-gradient-to-b from-buttonBottom to-button text-warmGray-50 rounded-md cursor-pointer z-[1]  hover:shadow-[0px_0px_20px_5px_#9F3ED5]"
        >
            Назад
        </button>
    );
};

export default GoBackBtn;
