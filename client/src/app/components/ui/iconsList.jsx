import React, { useRef, useEffect } from "react";
import * as icons from "react-icons/bs";

const IconsList = ({ chosenIcon }) => {
    const viewIcon = useRef(null);

    useEffect(() => {
        if (viewIcon.current) {
            viewIcon.current.scrollIntoView({
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
                        {icons[i]()}
                    </div>
                ) : (
                    <div
                        key={i}
                        data-icon={i}
                        className="scale-150 hover:scale-[2] cursor-pointer"
                    >
                        {icons[i]()}
                    </div>
                );
            })}
        </>
    );
};

const MemoizedIconsList = React.memo(IconsList);

export default MemoizedIconsList;
