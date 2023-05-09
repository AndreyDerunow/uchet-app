const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const tokenService = require("../services/token.service");
const { check, validationResult } = require("express-validator");

router.post("/signUp", [
    check("email", "Некорректный эмейл").isEmail(),
    check("password", "Длина пароля не может быть менее 8 символов").isLength({
        min: 8
    }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "INVALID_DATA",
                    code: 400
                });
            }
            const { email, password } = req.body;
            const isExisting = await User.findOne({ email });
            if (isExisting) {
                return res
                    .status(400)
                    .send({ message: "EMAIL_EXISTS", code: 400 });
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const newUser = await User.create({
                ...req.body,
                password: hashPassword
            });
            const tokens = tokenService.generate({ _id: newUser._id });
            await tokenService.save(newUser._id, tokens.refreshToken);

            res.status(201).send({ ...tokens, userId: newUser._id });
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже"
            });
        }
    }
]);

router.post("/signInWithPassword", [
    check("email", "Некорректный эмейл").isEmail(),
    check("password", "Пароль не может быть пустым").exists(),
    async (req, res) => {
        try {
            const errors = validationResult(res);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "INVALID_DATA",
                    code: 400
                });
            }
            const { email, password } = req.body;

            const existUser = await User.findOne({ email });

            if (!existUser) {
                return res.status(400).json({
                    message: "EMAIL_NOT_FOUND",
                    code: 400
                });
            }
            const isEqual = await bcrypt.compare(password, existUser.password);
            if (!isEqual) {
                return res.status(400).send({
                    message: "INVALID_PASSWORD",
                    code: 400
                });
            }
            const tokens = tokenService.generate({ _id: existUser._id });
            await tokenService.save(existUser._id, tokens.refreshToken);
            res.status(201).send({ ...tokens, userId: existUser._id });
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже"
            });
        }
    }
]);

//Todo: убрать комменты/ что-то не так с реврешем токена 1 раз

router.post("/token", async (req, res) => {
    try {
        const { refresh_token: refreshToken } = req.body;
        const data = tokenService.validateRefresh(refreshToken);
        const dbToken = await tokenService.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const tokens = tokenService.generate({ _id: data._id });
        await tokenService.save(data._id, tokens.refreshToken);
        res.status(201).send({ ...tokens, userId: data._id });
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
            payload1: e.message
        });
    }
});

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user.toString();
}
module.exports = router;
