import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-api";

export class AlreadyExistError extends CustomError {
  statusCode: number = StatusCodes.CONFLICT;
  constructor(message:string){
    super(message);
    Object.setPrototypeOf(this, AlreadyExistError.prototype)
  }
  serializeErrors() {
    return[
      {
        message: this.message,
      },
    ];
  }
  }
