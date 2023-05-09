import React from "react";

const Loader = () => {
    return (
        <div className="w-full h-[100%] flex justify-center items-center">
            <div className="flex gap-4">
                <div className="animate-bounce-x1 w-10 h-10 rounded-full bg-warmGray-50 shadow-[0px_0px_20px_5px_#9F3ED5]"></div>
                <div className="animate-bounce-x2 w-10 h-10 rounded-full bg-button"></div>

                <div className="animate-bounce-x3 w-10 h-10 rounded-full bg-button"></div>
            </div>
        </div>
    );
};

export default Loader;
