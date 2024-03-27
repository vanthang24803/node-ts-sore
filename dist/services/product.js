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
exports.createProductAsync = void 0;
const prisma_1 = require("../lib/prisma");
const upload_1 = require("./upload");
const createProductAsync = (images, data) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUpload = yield (0, upload_1.uploadService)(images);
    const newProduct = yield prisma_1.prisma.product.create({
        data: {
            name: data.name,
            rangePrice: data.rangePrice,
            description: data.description || "",
            thumbnail: imageUpload[0].url,
            guide: data.guide || "",
            options: {
                create: {
                    name: data.optionName,
                    price: data.optionPrice,
                    size: data.optionSize,
                },
            },
            categories: {
                create: {
                    category: { connect: { id: data.categoryId } },
                },
            },
        },
        include: {
            options: true,
        },
    });
    return newProduct;
});
exports.createProductAsync = createProductAsync;
