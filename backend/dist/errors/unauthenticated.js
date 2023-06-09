"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_api_1 = require("./custom-api");
class UnauthenticatedError extends custom_api_1.CustomError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        Object.setPrototypeOf(this, UnauthenticatedError.prototype);
    }
    serializeErrors() {
        return [
            {
                message: this.message,
            },
        ];
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
