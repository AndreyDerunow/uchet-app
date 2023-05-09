import React from "react";
import PropTypes from "prop-types";

const FilterBy = ({ categories, point, value, onFilter, onClearFilter }) => {
    return (
        <div className="grid scroll-auto text-center text-md m-0 items-start h-full">
            {categories.map((c) => (
                <div
                    key={c._id}
                    className={
                        (c._id === value ? "scale-105 bg-button" : "") +
                        " border flex justify-center cursor-pointer textShadow mx-auto items-center w-[156px] p-2 border-warmGray-50 h-10 rounded-lg"
                    }
                    onClick={() => onFilter({ point: point, value: c._id })}
                >
                    {c.name}
                </div>
            ))}
            <div
                onClick={onClearFilter}
                className="border bg-secColor flex justify-center mx-auto items-center p-2 cursor-pointer w-[156px] textShadow border-warmGray-50 h-10 rounded-lg"
            >
                Clear
            </div>
        </div>
    );
};

FilterBy.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    point: PropTypes.string,
    value: PropTypes.string,
    onFilter: PropTypes.func,
    onClearFilter: PropTypes.func
};

export default FilterBy;
