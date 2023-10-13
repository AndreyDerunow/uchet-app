import React, { FormEvent, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import Form from "../../common/form/form";
import PrimBtn from "../../ui/primBtn";
import {
    createCategory,
    getCurrentUserCategories,
    updateCategory
} from "../../../redux/categories";
import ColorField from "../../common/form/colorField";
import GoBackBtn from "../../ui/goBackBtn";
import ChooseIcon from "../../ui/chooseIconField";
import history from "../../../utils/history";
import { getUsersIsLogedIn } from "../../../redux/users";
import Unauthorized from "../redirect/unauthorized";
import { useAppDispatch, useAppSelector } from "../../../redux/createStore";

const CategoryForm = ({ backable, redirectable, onSubmit, id }) => {
    const isLoggedIn = useAppSelector(getUsersIsLogedIn());
    const [data, setData] = useState({
        name: "",
        color: "",
        icon: ""
    });
    const dispatch = useAppDispatch();

    const currentUserCategories = useAppSelector(getCurrentUserCategories());

    //Todo: создать интерфейс под c
    useEffect(() => {
        if (id && currentUserCategories) {
            const categoryData = currentUserCategories.find(
                (c) => c._id === id
            );
            setData(() => ({ ...categoryData }));
        }
    }, []);

    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (id) {
            dispatch(updateCategory(data));
        } else if (!id) {
            dispatch(createCategory(data));
        }
        setData({
            name: "",
            color: "",
            icon: ""
        });

        {
            onSubmit && onSubmit();
        }
        {
            redirectable && history.goBack();
        }
    };
    if (!isLoggedIn) {
        return <Unauthorized />;
    }
    return (
        <>
            <div className="grid grid-cols-12">
                {backable && <GoBackBtn />}
                <Form onSubmit={handleSubmit}>
                    <TextField
                        id="name"
                        placeholder="Введите название категории"
                        value={data.name}
                        onChange={handleChange}
                        name="name"
                        label="Название"
                    />
                    <ChooseIcon
                        label="Иконка"
                        name="icon"
                        id="icon"
                        onChange={handleChange}
                        chosenIcon={data.icon}
                    />
                    <ColorField
                        label="Выберите цвет"
                        name="color"
                        id="color"
                        onChange={handleChange}
                        value={data.color}
                    />
                    <PrimBtn type="submit" text="Готово!" />
                </Form>
            </div>
        </>
    );
};

CategoryForm.propTypes = {
    backable: PropTypes.bool,
    redirectable: PropTypes.bool,
    onSubmit: PropTypes.func,
    id: PropTypes.string
};

export default CategoryForm;
