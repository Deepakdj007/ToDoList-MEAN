import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/unauthenticated";
import { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
    user: {
      userId: string;
      name: string;
    };

}

const auth = async (req: CustomRequest, res: Response, next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1];

    try{
        const secretKey = process.env.JWT_SECRET as string;
        const payload = jwt.verify(token, secretKey)

        if(typeof payload !== 'string' && 'userId' in payload){
            req.user = {userId:payload.userId, name:payload.name}
        }
        else{
            console.log('Payload is not an object with a `userId` property.');  
        }
        next();
    }catch(err){
        throw new UnauthenticatedError('Authentication invalid')
    }
}

export default auth;