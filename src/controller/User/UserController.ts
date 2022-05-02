import { Request, Response } from "express";
import { UserBussines } from "../../bussines/User/UserBussines";
import { UserInputDTO } from "../../model/types";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/IdGenerator";
import { BaseDataBase } from "../../data/BaseDatabase";


export class UserController {

    async createUser(req: Request, res: Response) {
        try {

            const { name, email, password, typeUser } = req.body;

            const input: UserInputDTO = {
                name,
                email,
                password,
                typeUser
            }

            const userBussiness = new UserBussines(new IdGenerator, new HashManager)
            const message = await userBussiness.createUser(input)

            res.status(201).send({ message: message })

        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ message: error.message })
            } else {
                res.status(400).send({ message: "Unexpected Error !" })
            }
        } finally {
            await BaseDataBase.destroyConnection();
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const userBussiness = new UserBussines(new IdGenerator, new HashManager)
            const token = await userBussiness.login(email, password);

            res.status(200).send({ token });
        } catch (error: any) {
            res.status(400).send({
                message: error.message,
            });
        } finally {
            await BaseDataBase.destroyConnection();
        }
    }

    async searchCompanies(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization as string;
          const category = req.params.category;
          
          const userBussiness = new UserBussines(new IdGenerator,new HashManager)
          const result = await userBussiness.searchCompanies(token, category);
    
          res.status(200).send({ result });
        } catch (error: any) {
          res.status(400).send({
            message: error.message,
          });
        } finally {
          await BaseDataBase.destroyConnection();
        }
    }

    async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
          const { email } = req.body;

          const userBussiness = new UserBussines(new IdGenerator,new HashManager)
          const message = await userBussiness.forgotPassword(email);
    
          res.status(201).send({ message });
        } catch (error: any) {
          res.status(400).send({
            message: error.message,
          });
        } finally {
          await BaseDataBase.destroyConnection();
        }
      }
}

