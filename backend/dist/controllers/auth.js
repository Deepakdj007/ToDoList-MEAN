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
const User_1 = __importDefault(require("../models/User"));
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = require("../errors/bad-request");
const unauthenticated_1 = require("../errors/unauthenticated");
const already_exist_1 = require("../errors/already-exist");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.create(Object.assign({}, req.body));
        const token = user.createJWT();
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: { name: user.name }, token });
    }
    catch (err) {
        throw new already_exist_1.AlreadyExistError('User already exist !');
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("password:", password); // Add this line
    if (!email || !password) {
        throw new bad_request_1.BadRequestError('PLease provide email and password');
    }
    const user = yield User_1.default.findOne({ email });
    console.log("user:", user); // Add this line
    if (!user) {
        throw new unauthenticated_1.UnauthenticatedError('User not found');
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    console.log("isPasswordCorrect: ", +isPasswordCorrect);
    if (!isPasswordCorrect) {
        throw new unauthenticated_1.UnauthenticatedError('Wrong password');
    }
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: { name: user.name }, token });
});
const authControls = { register, login };
exports.default = authControls;
