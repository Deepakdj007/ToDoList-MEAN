import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/custom-api";
import express, {Application, Request, Response, ErrorRequestHandler} from 'express';

const errorHandlerMiddleware = (err:any, req:Request, res:Response, next:NextFunction)=>{
    
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later'
    }

    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors)
        .map((item:any)=>item.message)
        .join(',')
        customError.statusCode = 400;
    }
    if(err.code && err.code === 1100){
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`
    }
    if(err.name === 'CastError'){
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = 404;
    }
    next();
    return res.status(customError.statusCode).json({msg:customError.msg})

}

export default errorHandlerMiddleware;