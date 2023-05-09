import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import Form from "../../common/form/form";
import PrimBtn from "../../ui/primBtn";
import { useDispatch, useSelector } from "react-redux";
import {
    createCategory,
    getCurrentUserCategories,
    updateCategory
} from "../../../redux/categories";
import ColorField from "../../common/form/colorField";
import GoBackBtn from "../../ui/goBackBtn";
import ChooseIcon from "../../ui/chooseIconField";
import history from "../../../utils/history";
import { useParams } from "react-router-dom";
import { getUsersIsLogedIn } from "../../../redux/users";
import Unauthorized from "../redirect/unauthorized";

const CategoryForm = ({ backable, redirectable, onSubmit, id }) => {
    const isLoggedIn = useSelector(getUsersIsLogedIn());
    const [data, setData] = useState({
        name: "",
        color: "",
        icon: ""
    });
    const dispatch = useDispatch();

    const currentUserCategories = useSelector(getCurrentUserCategories());

    useEffect(() => {
        if (id) {
            const categoryData = currentUserCategories.find(
                (c) => c._id === id
            );
            setData(() => ({ ...categoryData }));
        }
    }, []);

    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const handleSubmit = (e) => {
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
