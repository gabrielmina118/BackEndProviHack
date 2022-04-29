import { BaseError } from "./baseError";

export class EmailExists extends BaseError {
    constructor(){
        super("This email already have an account registered" , 400);
    }
}

export class PasswordShort extends BaseError {
    constructor(){
        super("You need a stronger password, at least 6 digits" , 400);
    }
}






