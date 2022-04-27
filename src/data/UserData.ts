import { UserInputData } from "../model/types";
import { BaseDataBase } from "./BaseDatabase";

export class UserData extends BaseDataBase {

    private static TABLE_NAME = "users"

    async createUser(input: UserInputData) {
        const { id, name, email, password } = input

        try {
            await this.getConnection().insert({
                id,
                name,
                email,
                password
            })
            .into(UserData.TABLE_NAME)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Erro do banco !")
            }
        }
    }


}