import express from "express";

const authRouter = express.Router();

import authControls from "../controllers/auth";

authRouter.post('/register', authControls.register)
authRouter.get('/register', (req,res)=>{
    res.send('register');
})
authRouter.post('/login',authControls.login)

export default authRouter