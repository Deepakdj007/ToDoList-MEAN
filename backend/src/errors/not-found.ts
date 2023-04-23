import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-api";

export class NotFoundError extends CustomError {
  statusCode: number = StatusCodes.NOT_FOUND;
  constructor(message:string){
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
  serializeErrors() {
    return[
      {
        message: this.message,
      },
    ];
  }
  }