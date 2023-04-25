"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
const auth_1 = __importDefault(require("../controllers/auth"));
authRouter.post('/register', auth_1.default.register);
authRouter.get('/register', (req, res) => {
    res.send('register');
});
authRouter.post('/login', auth_1.default.login);
exports.default = authRouter;
