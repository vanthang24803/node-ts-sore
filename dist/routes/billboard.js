"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const billboard_1 = require("../controllers/billboard");
const upload_1 = __importDefault(require("../middlewares/upload"));
const billboard_2 = require("../models/billboard");
const validate_1 = __importDefault(require("../middlewares/validate"));
const router = express_1.default.Router();
router.post("/uploads", [upload_1.default.array("images"), (0, validate_1.default)(billboard_2.BillboardSchema)], billboard_1.createBillboard);
router.get("/", billboard_1.findAllBillboard);
router.put("/:id", billboard_1.updateBillboard);
router.get("/:id", billboard_1.findBillboardDetail);
router.delete("/:id", billboard_1.deleteBillboard);
exports.default = router;
