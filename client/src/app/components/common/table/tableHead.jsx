import React from "react";
import PropTypes from "prop-types";

import SortDir from "../sortDir";

const TableHead = ({ columns, onSort, selectedSort }) => {
    const columnsHead = columns.sort().map((key) => {
        switch (key) {
            case "category":
                return "Категория";
            case "sum":
                return "Сумма";
            case "comment":
                return "Комментарий";
            default:
                return;
        }
    });
    const handleSort = (sort) => {
        if (selectedSort.path === sort) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: sort, order: "asc" });
        }
    };
    return (
        <>
            <thead className="h-16">
                <tr>
                    <th
                        onClick={() => handleSort("created_at")}
                        className="cursor-pointer w-1/6"
                    >
                        Дата
                        {selectedSort.path === "created_at" && (
                            <SortDir direction={selectedSort.order} />
                        )}
                    </th>
                    {columnsHead.map((col, i) => {
                        if (col) {
                            if (
                                columns[i] === "category" ||
                                columns[i] === "sum"
                            ) {
                                return (
                                    <th
                                        onClick={() => {
                                            handleSort(columns[i]);
                                        }}
                                        className="cursor-pointer w-1/6"
                                        key={Math.random + col}
                                    >
                                        {col}
                                        {selectedSort.path === columns[i] && (
                                            <SortDir
                                                direction={selectedSort.order}
                                            />
                                        )}
                                    </th>
                                );
                            } else {
                                return (
                                    <th
                                        className="w-1/6"
                                        key={Math.random + col}
                                    >
                                        {col}
                                    </th>
                                );
                            }
                        }
                    })}
                    <th className="w-1/12">Изменить</th>
                    <th className="w-1/12">Удалить</th>
                </tr>
            </thead>
        </>
    );
};

TableHead.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string),
    onSort: PropTypes.func,
    selectedSort: PropTypes.object
};

export default TableHead;
