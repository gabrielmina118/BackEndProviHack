import { UserInputData } from "../model/types";
import { BaseDataBase } from "./BaseDatabase";

export class UserData extends BaseDataBase {
  private static TABLE_NAME = "users";

  async createUser(input: UserInputData): Promise<void> {
    const { id, name, email, password } = input;

    try {
      await this.getConnection()
        .insert({
          id,
          name,
          email,
          password,
        })
        .into(UserData.TABLE_NAME);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro do banco !");
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

  public async searchUser(email: string): Promise<any> {
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

  public async searchCategoryId(category: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("id")
        .from("categories")
        .where({name: category});

      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async searchCompanies(category_id: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select()
        .from("company_category")
        .where({ category_id });

      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}