import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import Form from "../../common/form/form";
import PrimBtn from "../../ui/primBtn";
import TextArea from "../../common/form/textArea";
import AddFileField from "../../common/form/addFilefield";
import GoBackBtn from "../../ui/goBackBtn";
import storage from "../../../utils/getFirebaseStorage";
import {
    deleteObject,
    getDownloadURL,
    listAll,
    ref,
    uploadBytes
} from "firebase/storage";

import history from "../../../utils/history";

import { updateUser } from "../../../redux/users";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const UserForm = ({ currentUser, backable, redirectable, onEdit }) => {
    const [data, setData] = useState({
        name: "",
        about: "",
        image: "",
        categories: [],
        phone: "",
        email: ""
    });

    const [image, setImage] = useState();
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setData(() => ({ ...currentUser }));
    }, []);
    const validateShema = yup.object().shape({
        name: yup
            .string()
            .required("Имя обязательно для заполнения")
            .matches(/(?=.{2,})/, "Поле должно содержать минимум 2 символа"),
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
    const handleChange = (e) => {
        const { target } = e;
        if (target) {
            if (target.name === "image") {
                setImage(target.value);
                setData((prev) => ({ ...prev, [target.name]: target.img }));
                return;
            }
            setData((prev) => ({ ...prev, [target.name]: target.value }));
        }
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;
        let currentImage;
        if (image) {
            const listRef = ref(storage, "images");
            const imagesList = await listAll(listRef);
            const formatedImagesList = imagesList.items.map((ref) => {
                if (ref._location.path_.endsWith(currentUser._id)) {
                    return ref._location.path_;
                }
            });
            formatedImagesList.forEach(async (image) => {
                if (image) {
                    const desertRef = ref(storage, image);
                    await deleteObject(desertRef);
                }
            });
            const fileName = image.name;
            const date = Date.now().toString();
            const uploadFileFullName =
                fileName + "_" + date + "_" + currentUser._id;
            const imageRef = ref(storage, `images/${uploadFileFullName}`);
            await uploadBytes(imageRef, image);
            currentImage = await getDownloadURL(imageRef);
        }

        const newData = currentImage ? { ...data, image: currentImage } : data;
        dispatch(updateUser(newData, redirectable));
        onEdit && onEdit();
    };

    return (
        <div className="grid grid-cols-12">
            {backable && <GoBackBtn />}
            <Form onSubmit={handleSubmit}>
                <TextField
                    id="name"
                    value={data.name}
                    onChange={handleChange}
                    name="name"
                    label="Имя"
                />
                <TextField
                    id="phone"
                    value={data.phone}
                    onChange={handleChange}
                    name="phone"
                    label="Телефон"
                    type="phone"
                />

                <TextField
                    id="email"
                    value={data.email}
                    onChange={handleChange}
                    name="email"
                    label="Email"
                />
                <TextArea
                    value={data.about}
                    onChange={handleChange}
                    label="О себе"
                    maxlength={400}
                    id="about"
                    name="about"
                />
                <AddFileField
                    value={data.image}
                    id="image"
                    name="image"
                    onChange={handleChange}
                />
                <PrimBtn disabled={!isValid} type="submit" text="Готово!" />
            </Form>
        </div>
    );
};

UserForm.propTypes = {
    id: PropTypes.string
};

export default UserForm;
