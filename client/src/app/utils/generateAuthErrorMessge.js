function generateAuthError(message) {
    switch (message) {
        case "EMAIL_NOT_FOUND": {
            return "Электронный адрес не зарегистрирован, либо пользователь был удален.";
        }

        case "INVALID_PASSWORD": {
            return "Неверно введен пароль";
        }
        case "USER_DISABLED": {
            return "Учетная запись пользователя отключена администратором";
        }
        case "INVALID_DATA": {
            return "Проверьте правильность ввода данных";
        }

        case "EMAIL_EXISTS": {
            return "Электронный адрес уже зарегистрирован. Воспользуйтесь формой входа";
        }

        default:
            return "Слишком много попытох входа. попробуйте позднее";
    }
}

export default generateAuthError;
