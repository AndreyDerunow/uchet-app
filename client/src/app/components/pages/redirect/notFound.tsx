import React from "react";
import GoBackBtn from "../../ui/goBackBtn";
import { BsFillEmojiNeutralFill } from "react-icons/bs";

const NotFound = () => {
    return (
        <div className="grid grid-cols-12">
            <GoBackBtn />
            <div className="grid py-7 my-7 col-start-4 col-span-6 place-content-center bg-transparent">
                <BsFillEmojiNeutralFill className="w-[300px] h-[300px] pb-4" />
                <h1 className="text-4xl text-center">Page not found...</h1>
            </div>
        </div>
    );
};

export default NotFound;
