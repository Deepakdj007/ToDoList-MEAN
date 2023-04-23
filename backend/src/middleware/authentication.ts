import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/unauthenticated";

const auth = async (req: Request, res: Response, next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1];
}