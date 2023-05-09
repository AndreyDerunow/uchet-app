import React from "react";
import history from "../../../utils/history";

const Unauthorized = () => {
    sessionStorage.setItem("redirect", history.location.pathname);
    return (
        <h1 className="absolute w-full top-1/2 text-center text-4xl">
            Не хватает прав. Пожалуйста, авторизируйтесь или зарегистрируйтесь.
        </h1>
    );
};

export default Unauthorized;
