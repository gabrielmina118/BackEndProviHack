import { BaseError } from "./baseError";

export class InvalidCredentials extends BaseError {
    constructor(){
        super("Password incorrect", 401)
    }
}

export class InvalidEmail extends BaseError {
    constructor(){
        super("Invalid Email", 401)
    }
}