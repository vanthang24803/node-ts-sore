"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const response_1 = __importDefault(require("../helpers/response"));
const status_1 = require("../enum/status");
const category_1 = require("../services/category");
const product_1 = require("../services/product");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const images = req.files;
        const exitingCategory = yield (0, category_1.isExist)(data.categoryId);
        if (!exitingCategory) {
            return res.status(404).json((0, response_1.default)(status_1.Status.NotFound, "Category"));
        }
        const result = yield (0, product_1.createProductAsync)(images, data);
        res.status(200).json((0, response_1.default)(status_1.Status.Success, result));
    }
    catch (error) {
        res.status(500).json((0, response_1.default)(status_1.Status.BadRequest));
        throw error;
    }
});
exports.createProduct = createProduct;
