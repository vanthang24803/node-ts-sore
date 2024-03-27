"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["Success"] = 0] = "Success";
    Status[Status["BadRequest"] = 1] = "BadRequest";
    Status[Status["NotFound"] = 2] = "NotFound";
    Status[Status["ServerError"] = 3] = "ServerError";
})(Status || (exports.Status = Status = {}));
