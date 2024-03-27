"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../enum/status");
function responseStatus(status, message) {
    let isSuccess;
    switch (status) {
        case status_1.Status.Success:
            isSuccess = true;
            break;
        case status_1.Status.BadRequest:
        case status_1.Status.NotFound:
            isSuccess = false;
            message = `${message} not found`;
            break;
        case status_1.Status.ServerError:
            isSuccess = false;
            message = "Server is error";
            break;
        default:
            isSuccess = false;
            break;
    }
    return {
        isSuccess,
        message,
    };
}
exports.default = responseStatus;
