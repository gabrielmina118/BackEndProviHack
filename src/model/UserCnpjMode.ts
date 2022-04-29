import { User } from "./UserModel";

export class UserCnpj extends User {
    private cnpj: string;
    private socialName :string;
    
    constructor(id: string, socialName:string, email: string, password: string,cpf: string) {
        super(id, email, password);
        this.cnpj = cpf;
        this.socialName = socialName
    }

    getCpnj(){
        return this.cnpj
    }

    getSocialName(){
        return this.socialName
    }
}