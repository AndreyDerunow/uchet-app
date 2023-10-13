import React, { ReactElement } from "react";
import { BsEmojiFrown } from "react-icons/bs";

import history from "../../../utils/history";
import { FallbackProps } from "react-error-boundary";
import PrimBtn from "../../ui/primBtn";

const Error = ({ resetErrorBoundary, error }: FallbackProps): ReactElement => {
    const handleClick = () => {
        console.log("Error: " + error);
        resetErrorBoundary();
        history.push("/");
    };
    return (
        <div className="grid grid-cols-12">
            <div className="grid py-7 my-7 col-start-4 col-span-6 place-content-center text-warmGray-50 bg-transparent">
                <BsEmojiFrown className="w-[300px] m-auto h-[300px] pb-4" />
                <h1 className="text-4xl text-center mb-5">
                    Something goes wrong. Please try again later.
                </h1>
                <PrimBtn onClick={handleClick} text="Main page" type="button" />
            </div>
        </div>
    );
};

export default Error;
