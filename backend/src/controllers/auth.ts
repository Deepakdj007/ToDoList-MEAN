import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request";
import { UnauthenticatedError } from "../errors/unauthenticated";
import express, {Application, Request, Response, ErrorRequestHandler} from 'express';

const register = async (req:Request, res:Response)=>{
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.name}, token})
}

const login = async (req:Request, res:Response)=>{
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError('PLease provide email and password')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }

    //compare password
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name}, token})
}

const authControls = {register, login}
export default authControls
