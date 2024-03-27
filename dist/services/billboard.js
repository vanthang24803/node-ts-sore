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
exports.deleteBillboardAsync = exports.updateBillboardAsync = exports.findBillboardDetailAsync = exports.isBillboardExistAsync = exports.findAllBillboardAsync = exports.createBillboardAsync = void 0;
const prisma_1 = require("../lib/prisma");
const upload_1 = require("./upload");
const createBillboardAsync = (images, data) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUpload = yield (0, upload_1.uploadService)(images);
    const newBillboard = yield prisma_1.prisma.billboard.create({
        data: {
            name: data.name,
            description: data.description,
            publicUrlId: imageUpload[0].publicId,
            url: imageUpload[0].url,
            categoryId: data.categoryId,
        },
    });
    return newBillboard;
});
exports.createBillboardAsync = createBillboardAsync;
const findAllBillboardAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.billboard.findMany();
});
exports.findAllBillboardAsync = findAllBillboardAsync;
const isBillboardExistAsync = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Boolean(yield prisma_1.prisma.billboard.findUnique({
        where: {
            id,
        },
    }));
});
exports.isBillboardExistAsync = isBillboardExistAsync;
const findBillboardDetailAsync = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.billboard.findFirst({
        where: {
            id,
        },
    });
});
exports.findBillboardDetailAsync = findBillboardDetailAsync;
const updateBillboardAsync = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBillboard = yield prisma_1.prisma.billboard.update({
        where: {
            id,
        },
        data: {
            name: data.name,
            description: data.description,
        },
    });
    return updateBillboard;
});
exports.updateBillboardAsync = updateBillboardAsync;
const deleteBillboardAsync = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exitingBillboard = yield prisma_1.prisma.billboard.findUnique({ where: { id } });
    if (exitingBillboard) {
        const result = yield (0, upload_1.deletePhotoService)(exitingBillboard.publicUrlId);
        if (result) {
            yield prisma_1.prisma.billboard.delete({
                where: {
                    id: exitingBillboard.id,
                },
            });
        }
    }
});
exports.deleteBillboardAsync = deleteBillboardAsync;
