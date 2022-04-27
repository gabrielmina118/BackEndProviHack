import { BaseDataBase } from "./BaseDatabase";

export class UserData extends BaseDataBase {

    private static TABLE_NAME = "users"

    async getUser() {
        try {
            const result = await this.getConnection().select('*').from('usuario_cubo')
            return result
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Erro do banco !")
            }
        }
    }


}