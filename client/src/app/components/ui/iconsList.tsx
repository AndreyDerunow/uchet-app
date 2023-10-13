import React, { useRef, useEffect, PropsWithoutRef } from "react";
import * as icons from "react-icons/bs";
import { Icons } from "../../interfaces/interfaces";

const IconsList = ({ chosenIcon }: Icons) => {
    const viewIcon = useRef(null);

    useEffect(() => {
        if (viewIcon.current) {
            (viewIcon.current as HTMLElement).scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }
    }, [chosenIcon]);
    return (
        <>
            {Object.keys(icons).map((i) => {
                return chosenIcon === i ? (
                    <div
                        key={i}
                        data-icon={i}
                        ref={viewIcon}
                        className="border-[3px] border-green-600 scale-150 hover:scale-[2] cursor-pointer"
                    >
                        {(icons as any)[i]()}
                    </div>
                ) : (
                    <div
                        key={i}
                        data-icon={i}
                        className="scale-150 hover:scale-[2] cursor-pointer"
                    >
                        {(icons as any)[i]()}
                    </div>
                );
            })}
        </>
    );
};

const MemoizedIconsList = React.memo(IconsList);

export default MemoizedIconsList;
