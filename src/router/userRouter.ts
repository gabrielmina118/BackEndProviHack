import {Router} from 'express'
import { UserController } from '../controller/User/UserController';

export const userRouter = Router();

const userController = new UserController()

userRouter.post("/user",userController.createUser)
userRouter.post("/login",userController.login)
userRouter.get("/category",userController.searchCompanies)