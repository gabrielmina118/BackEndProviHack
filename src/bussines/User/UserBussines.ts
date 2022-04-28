import { UserData } from "../../data/UserData"
import { UserInputData, UserInputDTO } from "../../model/types"
import { Authenticator } from "../../services/Authenticator"
import { HashManager } from "../../services/HashManager"
import { IdGenerator } from "../../services/IdGenerator"


export class UserBussines {

    constructor(
        private idGenerator: IdGenerator,
        private hashmanager: HashManager,
    ) { }

    async createUser(input: UserInputDTO) {

        // Nao esta retornando para o front a mensagem de erro
        Object.keys(input).forEach(function (item) {
            if (!input[item]) {
                throw new Error(`Field is missing -> ${item}`)
            }
        })

        const password = await this.hashmanager.hashCreate(input.password)

        const insertUser: UserInputData = {
            id: this.idGenerator.generateId(),
            name: input.name,
            email: input.email,
            password
        }

        const userData = new UserData()
        userData.createUser(insertUser)

    }

    async login(email: string, password: string) {
        if (!email || !password) {
          throw new Error("Missing some Fields")
        }
    
        const userData = new UserData()
        const [user] = await userData.login(email);

        if (!user) {
            throw new Error("User not found")
        }
    
        const passwordIsCorrect: boolean =
          user && await this.hashmanager.compare(password, user.password);

        
        console.log(passwordIsCorrect)
        
        if (!passwordIsCorrect) {
            throw new Error("Password incorrect")
        }
    
        const authenticator = new Authenticator()
        const token = authenticator.generateToken({
          id: user.id,
          role: user.role,
        });
    
        return token;
      }
}