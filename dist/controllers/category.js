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
exports.deleteAsync = exports.updateAsync = exports.findAllAsync = exports.createAsync = void 0;
const response_1 = __importDefault(require("../helpers/response"));
const category_1 = require("../services/category");
const status_1 = require("../enum/status");
const createAsync = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const result = yield (0, category_1.createCategory)(name);
        res.status(200).json((0, response_1.default)(status_1.Status.Success, result));
    }
    catch (error) {
        res.status(500).json((0, response_1.default)(status_1.Status.ServerError));
        throw Error;
    }
});
exports.createAsync = createAsync;
const findAllAsync = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, category_1.findAllCategory)();
        res.status(200).json((0, response_1.default)(status_1.Status.Success, result));
    }
    catch (error) {
        res.status(500).json((0, response_1.default)(status_1.Status.ServerError));
        throw Error;
    }
});
exports.findAllAsync = findAllAsync;
const updateAsync = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const categoryExists = yield (0, category_1.isExist)(id);
        if (!categoryExists) {
            return res.status(400).json((0, response_1.default)(status_1.Status.NotFound, "Category"));
        }
        const result = yield (0, category_1.updateCategory)(id, name);
        res.status(200).json((0, response_1.default)(status_1.Status.Success, result));
    }
    catch (error) {
        res.status(500).json((0, response_1.default)(status_1.Status.BadRequest));
        throw Error;
    }
});
exports.updateAsync = updateAsync;
const deleteAsync = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categoryExists = yield (0, category_1.isExist)(id);
        if (!categoryExists) {
            return res.status(404).json((0, response_1.default)(status_1.Status.NotFound, "Category"));
        }
        yield (0, category_1.deleteCategory)(id);
        res
            .status(200)
            .json((0, response_1.default)(status_1.Status.Success, "Category deleted successfully"));
    }
    catch (error) {
        res.status(500).json((0, response_1.default)(status_1.Status.ServerError));
        throw Error;
    }
});
exports.deleteAsync = deleteAsync;
