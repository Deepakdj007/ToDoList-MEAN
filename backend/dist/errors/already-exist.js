"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExistError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_api_1 = require("./custom-api");
class AlreadyExistError extends custom_api_1.CustomError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.CONFLICT;
        Object.setPrototypeOf(this, AlreadyExistError.prototype);
    }
    serializeErrors() {
        return [
            {
                message: this.message,
            },
        ];
    }
}
exports.AlreadyExistError = AlreadyExistError;
