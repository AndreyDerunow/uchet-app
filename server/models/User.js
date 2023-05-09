const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: { type: String, default: "Noname" },
        currentBalance: { type: Number, default: 0 },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: String,
        about: String,
        image: { type: String },
        operations: [{ type: Schema.Types.ObjectId, ref: "Operation" }],
        categories: [{ type: Schema.Types.ObjectId, ref: "Category" }]
    },
    {
        timestamps: true
    }
);

module.exports = model("User", schema);
