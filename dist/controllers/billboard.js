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
exports.deleteBillboard = exports.findBillboardDetail = exports.updateBillboard = exports.findAllBillboard = exports.createBillboard = void 0;
const response_1 = __importDefault(require("../helpers/response"));
const billboard_1 = require("../services/billboard");
const status_1 = require("../enum/status");
const category_1 = require("../services/category");
const createBillboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = req.files;
        const body = req.body;
        const isCategoryExist = yield (0, category_1.isExist)(body.categoryId);
        if (!isCategoryExist) {
            return res.status(404).json((0, response_1.default)(status_1.Status.NotFound, "Category"));
        }
        const result = yield (0, billboard_1.createBillboardAsync)(images, body);
        return res.status(200).json((0, response_1.default)(status_1.Status.Success, result));
    }
    catch (error) {
        res.status(500).json((0, response_1.default)(status_1.Status.ServerError));
        throw error;
    }
});
exports.createBillboard = createBillboard;
const findAllBillboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, billboard_1.findAllBillboardAsync)();
        res.status(200).json((0, response_1.default)(status_1.Status.Success, result));
    }
    catch (error) {
        res.status(500).json((0, response_1.default)(status_1.Status.ServerError));
        throw error;
    }
});
exports.findAllBillboard = findAllBillboard;
const updateBillboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const isBillboardExist = yield (0, billboard_1.isBillboardExistAsync)(id);
        if (!isBillboardExist) {
            return res.status(404).json((0, response_1.default)(status_1.Status.NotFound, "Billboard"));
        }
        const result = yield (0, billboard_1.updateBillboardAsync)(id, body);
        res.status(200).json((0, response_1.default)(status_1.Status.Success, result));
    }
    catch (error) {
        res.status(500).json((0, response_1.default)(status_1.Status.ServerError));
        throw error;
    }
});
exports.updateBillboard = updateBillboard;
const findBillboardDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const isBillboardExist = yield (0, billboard_1.isBillboardExistAsync)(id);
        if (!isBillboardExist) {
            return res.status(404).json((0, response_1.default)(status_1.Status.NotFound, "Billboard"));
        }
        const result = yield (0, billboard_1.findBillboardDetailAsync)(id);
        if (result) {
            res.status(200).json((0, response_1.default)(status_1.Status.Success, result));
        }
    }
    catch (error) {
        res.status(500).json((0, response_1.default)(status_1.Status.ServerError));
        throw error;
    }
});
exports.findBillboardDetail = findBillboardDetail;
const deleteBillboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const isBillboardExist = yield (0, billboard_1.isBillboardExistAsync)(id);
        if (!isBillboardExist) {
            return res.status(404).json((0, response_1.default)(status_1.Status.NotFound, "Billboard"));
        }
        yield (0, billboard_1.deleteBillboardAsync)(id);
        res
            .status(200)
            .json((0, response_1.default)(status_1.Status.Success, "Billboard deleted successfully!"));
    }
    catch (error) {
        res.status(500).json((0, response_1.default)(status_1.Status.ServerError));
        throw error;
    }
});
exports.deleteBillboard = deleteBillboard;
