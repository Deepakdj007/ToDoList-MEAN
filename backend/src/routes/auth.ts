import express from "express";

const authRouter = express.Router();

import authControls from "../controllers/auth";

authRouter.post('/register', authControls.register)
authRouter.post('/login',authControls.login)

export default authRouter