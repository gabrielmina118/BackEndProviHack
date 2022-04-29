import { User } from "./UserModel";

export class UserCpf extends User {
    private cpf: string;
    private name:string;

    constructor(id: string, name:string, email: string, password: string, cpf: string) {
        super(id, email, password);
        this.cpf = cpf;
        this.name = name;
    }

    getCpf(){
        return this.cpf
    }
    getName(){
        return this.name
    }
}