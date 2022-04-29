import { UserCnpj } from "../model/UserCnpjMode";
import { UserCpf } from "../model/UserCpfModel";
import { User } from "../model/UserModel";
import { BaseDataBase } from "./BaseDatabase";

export class UserData extends BaseDataBase {
  private static TABLE_NAME_CPF = "userCpf";
  private static TABLE_NAME_CNPJ = "userCnpj";

  async createUser(input: User): Promise<void> {

    try {

      if(input instanceof UserCpf){

        await this.getConnection()
        .insert({
          id : input.getId(),
          name:input.getName(),
          email:input.getEmail(),
          password:input.getPassword(),
        })
        .into(UserData.TABLE_NAME_CPF);

      }else if(input instanceof UserCnpj){
        await this.getConnection()
        .insert({
          id : input.getId(),
          socialName:input.getSocialName(),
          email:input.getEmail(),
          password:input.getPassword(),
        })
        .into(UserData.TABLE_NAME_CNPJ);
      }
      
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
      const userCPF = await this.getConnection()
        .select()
        .from(UserData.TABLE_NAME_CPF)
        .where({ email });

        const userCNPJ = await this.getConnection()
        .select()
        .from(UserData.TABLE_NAME_CNPJ)
        .where({ email });

      return [userCNPJ,userCPF];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async searchUser(email: string): Promise<any> {
    try {
      const userCNPJ = await this.getConnection()
        .select()
        .from(UserData.TABLE_NAME_CNPJ)
        .where({ email });

        const userCPF = await this.getConnection()
        .select()
        .from(UserData.TABLE_NAME_CPF)
        .where({ email });

      return [userCPF,userCNPJ];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}