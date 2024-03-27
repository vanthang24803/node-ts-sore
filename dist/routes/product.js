"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const product_1 = require("../models/product");
const upload_1 = __importDefault(require("../middlewares/upload"));
const product_2 = require("../controllers/product");
const router = express_1.default.Router();
router.post("/", [(0, validate_1.default)(product_1.ProductSchema), upload_1.default.array("images")], product_2.createProduct);
exports.default = router;
