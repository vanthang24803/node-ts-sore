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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.isExist = exports.findAllCategory = exports.createCategory = void 0;
const prisma_1 = require("../lib/prisma");
const createCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = yield prisma_1.prisma.category.create({
        data: {
            name,
        },
    });
    return newCategory;
});
exports.createCategory = createCategory;
const findAllCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.category.findMany();
});
exports.findAllCategory = findAllCategory;
const isExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Boolean(yield prisma_1.prisma.category.findUnique({
        where: {
            id,
        },
    }));
});
exports.isExist = isExist;
const updateCategory = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    const updateCategory = yield prisma_1.prisma.category.update({
        where: { id },
        data: {
            name,
        },
    });
    return updateCategory;
});
exports.updateCategory = updateCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.category.delete({
        where: {
            id,
        },
    });
});
exports.deleteCategory = deleteCategory;
