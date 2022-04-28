import { UserData } from "../../data/UserData"
import { UserInputData, UserInputDTO } from "../../model/types"
import { Authenticator } from "../../services/Authenticator"
import { HashManager } from "../../services/HashManager"
import { IdGenerator } from "../../services/IdGenerator"
import { InvalidCredentials, InvalidEmail } from "../../error/invalidCredentials"
import { PasswordShort } from "../../error/generalError"
import { MissingFields } from "../../error/missingFields"
import { UserNotFound } from "../../error/notFound"


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

        const verification = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/
        const ok = verification.exec(input.email)

        if(!ok){
            throw new InvalidEmail()
        }
      
        if(input.password.length < 6){
            throw new PasswordShort()
        }

        const password = await this.hashmanager.hashCreate(input.password)    

        const insertUser: UserInputData = {
            id: this.idGenerator.generateId(),
            name: input.name,
            email: input.email,
            password
        }

        const userData = new UserData()
        userData.createUser(insertUser)
        return "User Created Successfully!"
    }

    async login(email: string, password: string) {
        if (!email || !password) {
          throw new MissingFields()
        }
    
        const userData = new UserData()
        const [user] = await userData.login(email);

        if (!user) {
            throw new UserNotFound()
        }
    
        const passwordIsCorrect: boolean =
          user && await this.hashmanager.compare(password, user.password);

        if (!passwordIsCorrect) {
            throw new InvalidCredentials()
        }
    
        const authenticator = new Authenticator()
        const token = authenticator.generateToken({
          id: user.id,
          role: user.role,
        });
    
        return token;
      }
}