export abstract class User {

    constructor(
        private id: string,
        private email: string,
        private password: string
    ) { }

    getId(){
        return this.id
    }

    getEmail(){
        return this.email
    }

    getPassword(){
        return this.password
    }
}



