import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-api";

export class UnauthenticatedError extends CustomError {
  statusCode: number = StatusCodes.UNAUTHORIZED;
  constructor(message:string){
    super(message);
    Object.setPrototypeOf(this, UnauthenticatedError.prototype)
  }
  serializeErrors() {
    return[
      {
        message: this.message,
      },
    ];
  }
  }