import React, { useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ count, pageSize, onPageChange, currentPage }) => {
    useEffect(() => {
        if (currentPage !== 1 && count === pageSize * (currentPage - 1)) {
            onPageChange(currentPage - 1);
        }
    }, [count]);
    const pageCount = Math.ceil(count / pageSize);

    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
        <nav className="flex justify-center items-center gap-2">
            {pages.map((p) => (
                <li
                    className={
                        "list-none cursor-pointer hover:scale-110 text-center text-lg textShadow border border-warmGray-50 rounded-lg w-12" +
                        (p === currentPage ? " bg-buttonBottom" : "")
                    }
                    key={"page_" + p}
                >
                    <div onClick={() => onPageChange(p)}>{p}</div>
                </li>
            ))}
        </nav>
    );
};

Pagination.propTypes = {
    count: PropTypes.number,
    pageSize: PropTypes.number,
    onPageChange: PropTypes.func,
    currentPage: PropTypes.number
};

export default Pagination;
