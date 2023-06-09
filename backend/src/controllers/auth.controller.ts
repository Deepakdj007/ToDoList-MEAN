import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request";
import { UnauthenticatedError } from "../errors/unauthenticated";
import express, {Application, Request, Response, ErrorRequestHandler} from 'express';
import { AlreadyExistError } from "../errors/already-exist";
import multer from 'multer'
 
const register = async (req:Request, res:Response)=>{

    try{
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.name}, token})
    }catch(err){
        throw new AlreadyExistError('User already exist !')
    }    
}

const login = async (req:Request, res:Response)=>{
    const {email, password} = req.body;
    console.log("password:", password); // Add this line

    if(!email || !password){
        throw new BadRequestError('PLease provide email and password')
    }
    const user = await User.findOne({email})
    console.log("user:", user); // Add this line
    if(!user){
        throw new UnauthenticatedError('User not found')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    console.log("isPasswordCorrect: ",+isPasswordCorrect)
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Wrong password')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name, email:user.email}, token})
}

const authControls = {register, login}
export default authControls
