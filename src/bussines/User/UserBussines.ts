import { UserData } from "../../data/UserData"
import { UserInputData, UserInputDTO } from "../../model/types"
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
}