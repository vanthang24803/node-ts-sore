"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const category_1 = require("../models/category");
const category_2 = require("../controllers/category");
const router = express_1.default.Router();
router.post("/", (0, validate_1.default)(category_1.CategorySchema), () => {
});
router.get("/", category_2.createAsync);
exports.default = router;
