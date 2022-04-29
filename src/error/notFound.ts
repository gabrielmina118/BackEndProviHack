import { BaseError } from "./baseError";

export class UserNotFound extends BaseError {
    constructor(){
        super("User not found" , 404);
    }
}

export class EmailNotFound extends BaseError{
    constructor(){
        super("Email not Found" , 404);
    }
}

export class UsersNotFound extends BaseError{
    constructor(){
        super("Users not Found" , 404);
    }
}