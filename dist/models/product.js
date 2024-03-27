"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductSchema = exports.ProductSchema = void 0;
const z = __importStar(require("zod"));
exports.ProductSchema = z.object({
    name: z.string().min(1),
    rangePrice: z.string().min(1),
    description: z.string().min(1).optional(),
    guide: z.string().min(1).optional(),
    optionName: z.string().min(1),
    optionPrice: z.number().min(1),
    optionSize: z.string().min(1),
    categoryId: z.string().min(1),
});
exports.UpdateProductSchema = z.object({
    name: z.string().min(1),
    rangePrice: z.string().min(1),
    description: z.string().min(1).optional(),
    guide: z.string().min(1).optional(),
});
