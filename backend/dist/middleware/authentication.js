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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthenticated_1 = require("../errors/unauthenticated");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new unauthenticated_1.UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];
    try {
        const secretKey = process.env.JWT_SECRET;
        const payload = jsonwebtoken_1.default.verify(token, secretKey);
        if (typeof payload !== 'string' && 'userId' in payload) {
            req.user = { userId: payload.userId, name: payload.name };
        }
        else {
            console.log('Payload is not an object with a `userId` property.');
        }
        next();
    }
    catch (err) {
        throw new unauthenticated_1.UnauthenticatedError('Authentication invalid');
    }
});
exports.default = auth;
