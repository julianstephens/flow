import { HttpException } from "@nestjs/common";
import { StatusCodes } from "http-status-codes";


export class NotFoundException extends HttpException {
    constructor() {
        super("Resource not found", StatusCodes.NOT_FOUND)
    }
}