import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import Form from "../../common/form/form";
import PrimBtn from "../../ui/primBtn";
import { useDispatch, useSelector } from "react-redux";

import {
    createOperation,
    getOperationsList,
    updateOperation
} from "../../../redux/operations";
import RadioField from "../../common/form/radioField";
import GoBackBtn from "../../ui/goBackBtn";
import SelectCategoryField from "../../common/form/selectCategoryField";
import { getUsersIsLogedIn } from "../../../redux/users";
import Unauthorized from "../redirect/unauthorized";

const OperationForm = ({
    id,
    backable,
    redirectable,
    onSubmit,
    onAddCategory
}) => {
    const [data, setData] = useState({
        sum: "",
        comment: "",
        type: "top up",
        category: ""
    });
    const isLoggedIn = useSelector(getUsersIsLogedIn());

    const currentUserOperations = useSelector(getOperationsList());

    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            const operationData = currentUserOperations.find(
                (o) => o._id === id
            );
            if (operationData) {
                setData(() => ({ ...operationData }));
            }
        }
    }, []);

    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            dispatch(updateOperation(data, redirectable));
            onSubmit && onSubmit();
        } else if (!id) {
            dispatch(createOperation(data, redirectable));
        }
        setData({
            sum: "",
            comment: "",
            type: "top up",
            category: ""
        });
    };
    if (!isLoggedIn) {
        return <Unauthorized />;
    }
    return (
        <div className="grid grid-cols-12">
            {backable && <GoBackBtn />}
            <Form onSubmit={handleSubmit}>
                <TextField
                    type="number"
                    id="sum"
                    placeholder="Введите Сумму"
                    value={data.sum}
                    onChange={handleChange}
                    name="sum"
                    label="Сумма"
                />
                <TextField
                    id="comment"
                    placeholder="Введите Комментарий"
                    value={data.comment}
                    onChange={handleChange}
                    name="comment"
                    label="Комментарий"
                />
                <SelectCategoryField
                    label="Категория"
                    value={data.category}
                    onChange={handleChange}
                    id="category"
                    name="category"
                    onAddCategory={onAddCategory}
                />
                <RadioField
                    label="Тип"
                    onChange={handleChange}
                    name="type"
                    value={data.type}
                    options={[
                        { name: "+", value: "top up" },
                        { name: "-", value: "take off" }
                    ]}
                />

                <PrimBtn type="submit" text="Готово!" />
            </Form>
        </div>
    );
};

OperationForm.propTypes = {
    id: PropTypes.string,
    backable: PropTypes.bool,
    redirectable: PropTypes.bool,
    onSubmit: PropTypes.func,
    onAddCategory: PropTypes.func
};

export default OperationForm;
