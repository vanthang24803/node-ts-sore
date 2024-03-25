"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsync = void 0;
const createAsync = (req, res) => {
    return res.status(200).json({
        message: "Hello World",
    });
};
exports.createAsync = createAsync;
