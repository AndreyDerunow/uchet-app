const express = require("express");
const Operation = require("../models/Operation");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/myOperations", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const list = await Operation.find({ userId });
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
            payload: e.message
        });
    }
});
router.get("/", auth, async (req, res) => {
    try {
        const list = await Operation.find();
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
            payload: e.message
        });
    }
});
router.post("/", auth, async (req, res) => {
    try {
        const userId = req.user._id;

        const newOperation = await Operation.create({
            ...req.body,
            userId
        });
        res.status(201).send(newOperation);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
            payload: e.message
        });
    }
});
router.delete("/:operationId", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const { operationId } = req.params;
        const userDeleting = await User.findById(userId);
        const operationDeleting = await Operation.findById(operationId);
        if (operationDeleting.userId.toString() === userId) {
            const curOper =
                operationDeleting.type === "top up"
                    ? -operationDeleting.sum
                    : +operationDeleting.sum;
            await Operation.findByIdAndRemove(operationId);
            const { operations, currentBalance } = userDeleting;
            const updatedBalance = currentBalance + +curOper;
            const operationsList = operations.filter(
                (o) => o.toString() !== operationId
            );
            await User.updateOne(
                { _id: userId },
                { operations: operationsList, currentBalance: updatedBalance }
            );
            res.status(200).send(null);
        } else {
            return res.status(400).json({
                message: "Недостаточно прав."
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
            payload: e.message
        });
    }
});
router.patch("/:operationId", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const { operationId } = req.params;

        const userUpdating = await User.findById(userId);
        const operationUpdating = await Operation.findById(operationId);
        console.log("userId", userId);
        console.log(
            "operationUpdating.userId.toString()",
            operationUpdating.userId.toString()
        );
        if (operationUpdating.userId.toString() === userId) {
            const updatedOperation = await Operation.findByIdAndUpdate(
                operationId,
                req.body,
                { new: true }
            );
            const { type, sum } = updatedOperation;
            const curOper = type === "top up" ? +sum : -sum;
            const updatedBalance =
                userUpdating.currentBalance +
                (operationUpdating.type === "top up"
                    ? -operationUpdating.sum
                    : +operationUpdating.sum) +
                curOper;
            await User.updateOne(
                { _id: userId },
                { currentBalance: updatedBalance }
            );
            res.status(200).send(updatedOperation);
        } else {
            return res.status(400).json({
                message: "Недостаточно прав."
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
            payload: e.message
        });
    }
});

module.exports = router;
