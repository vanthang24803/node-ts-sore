"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = require("./lib/prisma");
const app = (0, express_1.default)();
// TODO : Settings
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello World 123");
});
(0, prisma_1.Connection)();
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
