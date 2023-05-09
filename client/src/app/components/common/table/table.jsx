import React from "react";
import PropTypes from "prop-types";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

const Table = ({ columns, rows, onClick, onSort, selectedSort }) => {
    return (
        <>
            <table className="w-full text-lg text-center border-spacing-2 mb-4">
                <TableHead
                    columns={columns}
                    onClick={onClick}
                    onSort={onSort}
                    selectedSort={selectedSort}
                />
                <TableBody columns={columns} rows={rows} onClick={onClick} />
            </table>
        </>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object
};

export default Table;
