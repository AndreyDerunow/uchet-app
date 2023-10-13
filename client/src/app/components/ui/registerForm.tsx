import React, { useEffect, useState } from "react";
import TextArea from "../common/form/textArea";
import TextField from "../common/form/textField";
import CheckboxField from "../common/form/checkboxField";
import Form from "../common/form/form";
import PrimBtn from "./primBtn";
import { SignUp, getAuthErrors } from "../../redux/users";
import AddFileField from "../common/form/addFilefield";
import storage from "../../utils/getFirebaseStorage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as yup from "yup";
import localStorageService from "../../services/localStorage.service";
import getDefaultImage from "../../utils/getDefaultImage";
import { useAppDispatch, useAppSelector } from "../../redux/createStore";
import { Errors } from "./loginForm";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        passwordRepeat: "",
        name: "",
        phone: "",
        about: "",
        image: "",
        stayIn: false
    });
    const [errors, setErrors] = useState<Errors>({});
    //Todo: убрать эни
    const [image, setImage] = useState<any>();
    const dispatch = useAppDispatch();
    const authError = useAppSelector(getAuthErrors());
    const validateShema = yup.object().shape({
        name: yup
            .string()
            .required("Имя обязательно для заполнения")
            .matches(/(?=.{2,})/, "Поле должно содержать минимум 2 символа"),
        passwordRepeat: yup.string().test({
            test: (value) => value === data.password,
            message: "Пароли не одинаковы"
        }),
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
        if (target.name === "image") {
            setImage(target.value);
            setData((prev) => ({ ...prev, [target.name]: target.img }));
            return;
        }
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;
        let currentImage;
        if (image) {
            const fileName = image.name;
            const date = Date.now().toString();
            const uploadFileFullName = fileName + "_" + date + "_newUser";
            const imageRef = ref(storage, `images/${uploadFileFullName}`);
            await uploadBytes(imageRef, image);
            currentImage = await getDownloadURL(imageRef);
        }
        const newData = currentImage
            ? { ...data, image: currentImage }
            : { ...data, image: getDefaultImage() };
        localStorageService.setStayIn(data.stayIn);
        console.log(newData);
        dispatch(SignUp(newData));
    };
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <TextField
                    value={data.email}
                    onChange={handleChange}
                    label="Email"
                    id="email"
                    placeholder="Введите Email"
                    name="email"
                    error={errors.email}
                />
                <TextField
                    value={data.password}
                    onChange={handleChange}
                    label="Пароль"
                    id="password"
                    placeholder="Введите пароль"
                    name="password"
                    error={errors.password}
                />
                <TextField
                    id="password"
                    placeholder="Повторите пароль"
                    value={data.passwordRepeat}
                    onChange={handleChange}
                    name="passwordRepeat"
                    label="Повтор пароля"
                    error={errors.passwordRepeat}
                />
                <TextField
                    value={data.name}
                    onChange={handleChange}
                    label="Имя"
                    id="name"
                    placeholder="Введите имя"
                    name="name"
                    error={errors.name}
                />

                <TextField
                    type="phone"
                    value={data.phone}
                    onChange={handleChange}
                    label="Телефон"
                    id="phone"
                    placeholder="Введите телефон"
                    name="phone"
                />

                <TextArea
                    value={data.about}
                    onChange={handleChange}
                    label="О себе"
                    placeholder="Расскажите коротко о себе"
                    maxlength={400}
                    id="about"
                    name="about"
                />

                <AddFileField
                    onChange={handleChange}
                    id="image"
                    name="image"
                    value={data.image}
                />
                <CheckboxField
                    id="stayIn"
                    name="stayIn"
                    value={data.stayIn}
                    onChange={handleChange}
                    label="Оставаться в сети"
                />
                {authError && <span className="text-red-600">{authError}</span>}
                <PrimBtn
                    disabled={!isValid}
                    type="submit"
                    text="Зарегистрироваться"
                />
            </Form>
        </>
    );
};

export default RegisterForm;
