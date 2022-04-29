export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
    ) { }

    static userModel(user: User) {
        return new User(user.id, user.name, user.email, user.password)
    }
}


