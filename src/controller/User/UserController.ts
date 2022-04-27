import { Request, Response } from "express";
import { UserBussines } from "../../bussines/User/UserBussines";
import { UserInputDTO } from "../../model/types";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/IdGenerator";


export class UserController {

    async createUser(req: Request, res: Response) {
        try {

            const {name,email,password} = req.body;

            const input:UserInputDTO ={
                name,
                email,
                password
            }

            const userBussines = new UserBussines(new IdGenerator,new HashManager)
            userBussines.createUser(input)

            res.status(201).send({message:"User Created Successfully!"})

        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ message: error.message })
            } else {
                res.status(400).send({ message: "Unexpected Error !" })
            }
        }
    }
}

