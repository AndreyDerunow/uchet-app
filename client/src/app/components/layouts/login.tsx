import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ABtn from "../ui/aBtn";

import LoginForm from "../ui/loginForm";
import RegisterForm from "../ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? "Register" : "Login"
    );

    const toggleFormType = () => {
        setFormType((prev) => (prev === "Register" ? "Login" : "Register"));
    };
    return (
        <>
            <h1 className="col-span-12 mb-4 text-center">{formType}</h1>
            <div className="grid grid-cols-12 ">
                {formType === "Login" ? (
                    <>
                        <LoginForm />
                        <p className="col-start-4 col-span-6 text-center mt-2">
                            Еще нет аккаунта?
                            <ABtn text="Создать" onClick={toggleFormType} />
                        </p>
                    </>
                ) : (
                    <>
                        <RegisterForm />
                        <p className="col-start-4 col-span-6 text-center mt-2">
                            Уже есть аккаунт?
                            <ABtn text="Войти" onClick={toggleFormType} />
                        </p>
                    </>
                )}
            </div>
        </>
    );
};

export default Login;
