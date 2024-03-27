"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = __importDefault(require("./category"));
const billboard_1 = __importDefault(require("./billboard"));
const product_1 = __importDefault(require("./product"));
const router = express_1.default.Router();
router.use("/categories", category_1.default);
router.use("/billboards", billboard_1.default);
router.use("/products", product_1.default);
exports.default = router;
