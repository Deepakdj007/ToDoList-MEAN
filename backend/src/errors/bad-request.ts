import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-api";

export class BadRequestError extends CustomError {
  statusCode: number = StatusCodes.BAD_REQUEST;
  constructor(message:string){
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
  serializeErrors() {
    return[
      {
        message: this.message,
      },
    ];
  }
  }
