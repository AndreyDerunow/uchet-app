import React from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { getCategoriesList } from "../../../redux/categories";
import * as icons from "react-icons/bs";
import formateDate from "../../../utils/formateDate";
import { getCurrentUserId } from "../../../redux/users";
import { removeOperation } from "../../../redux/operations";
import { useAppDispatch, useAppSelector } from "../../../redux/createStore";
import { ITableBody } from "../../../interfaces/interfaces";

const TableBody = ({ columns, rows, onClick }: ITableBody) => {
    const userId = useAppSelector(getCurrentUserId());
    const categories = useAppSelector(getCategoriesList());
    const dispatch = useAppDispatch();
    const formatedRows = rows.map((row) => {
        const obj = row;
        row = {};
        columns.forEach((c) => {
            switch (c) {
                case "created_at":
                    row[c] = formateDate(obj[c], false);
                    break;
                case "type":
                    row[c] = obj[c] === "top up" ? "+" : "-";
                    break;
                default:
                    row[c] = obj[c];
                    break;
            }
        });
        return row;
    });
    const handleChange = ({ target }: React.MouseEvent<HTMLDivElement>) => {
        const currentOperation = (target as HTMLElement).dataset.operation
            ? (target as HTMLElement).dataset.operation
            : ((target as HTMLElement).closest("div") as HTMLElement).dataset
                  .operation;
        onClick &&
            onClick({ target: { dataset: { id: "add" }, currentOperation } });
    };
    const handleDelete = ({ target }: React.MouseEvent<HTMLDivElement>) => {
        const currentOperation = (target as HTMLElement).dataset.operation
            ? (target as HTMLElement).dataset.operation
            : ((target as HTMLElement).closest("div") as HTMLElement).dataset
                  .operation;
        dispatch(removeOperation(currentOperation));
    };

    return (
        <tbody>
            {formatedRows.map((r) => {
                const category =
                    categories && categories.find((c) => c._id === r.category);
                return (
                    <tr key={r._id} className="h-10">
                        <td>{r.created_at}</td>
                        <td>
                            {
                                <div
                                    style={{ backgroundColor: category.color }}
                                    className="w-full text-black opacity-70 rounded-lg"
                                >
                                    <span>
                                        {(icons as any)[category.icon]()}{" "}
                                    </span>
                                    {category.name}
                                </div>
                            }
                        </td>
                        <td>{r.comment}</td>
                        <td>
                            <span
                                className={
                                    r.type === "+"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
                            >
                                {r.type + " "}
                            </span>
                            {r.sum}
                        </td>
                        <td>
                            {userId === r.userId ? (
                                <div
                                    onClick={handleChange}
                                    data-operation={r._id}
                                >
                                    <BsFillPencilFill className="hover:scale-150 cursor-pointer" />
                                </div>
                            ) : (
                                <p className="text-2xl">-</p>
                            )}
                        </td>
                        <td>
                            {userId === r.userId ? (
                                <div
                                    onClick={handleDelete}
                                    data-operation={r._id}
                                >
                                    <BsFillTrashFill className="hover:scale-150 cursor-pointer" />
                                </div>
                            ) : (
                                <p className="text-2xl">-</p>
                            )}
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;
