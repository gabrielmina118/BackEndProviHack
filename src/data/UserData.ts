import { UserInputData } from "../model/types";
import { BaseDataBase } from "./BaseDatabase";

export class UserData extends BaseDataBase {

    private static TABLE_NAME = "users"

    async createUser(input: UserInputData): Promise<void> {
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

    public async login(email: string): Promise<any> {
        try {
          const user = await this.getConnection()
            .select()
            .from(UserData.TABLE_NAME)
            .where({ email });
       
          return user;
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
      }


}