import React, { useState, useEffect } from "react";

import TextField from "../common/form/textField";
import Form from "../common/form/form";
import CheckboxField from "../common/form/checkboxField";
import PrimBtn from "./primBtn";
import { useDispatch, useSelector } from "react-redux";
import { SignIn, getAuthErrors } from "../../redux/users";
import * as yup from "yup";
import localStorageService from "../../services/localStorage.service";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayIn: false
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const authError = useSelector(getAuthErrors());
    const validateShema = yup.object().shape({
        password: yup
            .string()
            .required("Пароль обязателен для заполнения")
            .matches(
                /(?=.*[A-Z])/,
                "Пароль должен содержать хотя бы одну заглавную букву"
            )
            .matches(
                /(?=.*[0-9])/,
                "Пароль должен содержать хотя бы одну цифру"
            )
            .matches(
                /(?=.{8,})/,
                "Пароль должен состоять минимум из 8 символов"
            ),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Email введен некорректно")
    });
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        validateShema
            .validate(data)
            .then(() => {
                setErrors({});
            })
            .catch((e) => {
                setErrors({ [e.path]: e.message });
            });
        return Object.keys(errors).length === 0;
    };
    const handleChange = ({ target }) => {
        if (target.name === "stayIn") {
            setData((prev) => ({ ...prev, [target.name]: !prev[target.name] }));
            return;
        }
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        console.log(data);
        localStorageService.setStayIn(data.stayIn);
        dispatch(SignIn(data));
    };
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <TextField
                    id="email"
                    placeholder="Введите Email"
                    value={data.email}
                    onChange={handleChange}
                    name="email"
                    label="Email"
                    error={errors.email}
                />
                <TextField
                    id="password"
                    placeholder="Введите пароль"
                    value={data.password}
                    onChange={handleChange}
                    name="password"
                    label="Пароль"
                    error={errors.password}
                />
                <CheckboxField
                    id="stayIn"
                    name="stayIn"
                    value={data.stayIn}
                    onChange={handleChange}
                    label="Оставаться в сети"
                />
                {authError && <span className="text-red-600">{authError}</span>}
                <PrimBtn disabled={!isValid} type="submit" text="Войти" />
            </Form>
        </>
    );
};

export default LoginForm;
