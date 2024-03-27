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
exports.deletePhotoService = exports.uploadService = void 0;
const cloudinary_1 = __importDefault(require("../configs/cloudinary"));
const uploadService = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const images = files === null || files === void 0 ? void 0 : files.map((file) => file.path);
    const uploadImages = [];
    for (const image of images !== null && images !== void 0 ? images : []) {
        const result = yield cloudinary_1.default.uploader.upload(image);
        uploadImages.push({
            url: result.secure_url,
            publicId: result.public_id,
        });
    }
    return uploadImages;
});
exports.uploadService = uploadService;
const deletePhotoService = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_1.default.uploader.destroy(publicId);
    return result.result === "ok";
});
exports.deletePhotoService = deletePhotoService;
