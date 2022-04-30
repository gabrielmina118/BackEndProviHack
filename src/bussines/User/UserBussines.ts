import { UserData } from "../../data/UserData"
import { UserInputData, UserInputDTO } from "../../model/types"
import { Authenticator } from "../../services/Authenticator"
import { HashManager } from "../../services/HashManager"
import { IdGenerator } from "../../services/IdGenerator"
import { InvalidCredentials, InvalidEmail } from "../../error/invalidCredentials"
import { PasswordShort, EmailExists } from "../../error/generalError"
import { MissingFields } from "../../error/missingFields"
import { UserNotFound } from "../../error/notFound"
import { UserCpf } from "../../model/UserCpfModel"
import { UserCnpj } from "../../model/UserCnpjMode"
import { MissingToken } from "../../error/missingToken"



export class UserBussines {

    constructor(
        private idGenerator: IdGenerator,
        private hashmanager: HashManager,
    ) { }

    async createUser(input: UserInputDTO) {
        const userData = new UserData()

        const [userCPFExist,userCNPJExist] = await userData.searchUser(input.email)
        if(userCPFExist[0] || userCNPJExist[0]){
            throw new EmailExists()
        }

        Object.keys(input).forEach(function (item) {
            if (!input[item]) {
                throw new Error(`Field is missing '${item.toUpperCase()}'`)
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

        const id = this.idGenerator.generateId()

        if(input.typeUser.toUpperCase() === "CPF"){
            const insertUserCPF =  new UserCpf(id,input.name,input.email,password,input.typeUser)
            await userData.createUser(insertUserCPF)
        }else{
            const insertUserCNPJ =  new UserCnpj(id,input.name,input.email,password,input.typeUser)

            await userData.createUser(insertUserCNPJ)
        }
        
        return "User Created Successfully!"
    }

    async login(email: string, password: string) {
        if (!email || !password) {
          throw new MissingFields()
        }

        const userData = new UserData()
        const [userCNPJ ,userCPF] = await userData.login(email);
      
        
        if(userCNPJ[0]){
            let user = userCNPJ[0]
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
        } else if(userCPF[0]){
            let user = userCPF[0]
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
        } else {
            throw new Error("user doesn't exist")
        }
        
      }

      async searchCompanies(token:string, category: any) {
        if (!token) {
            throw new MissingToken()
        }

        const authenticator = new Authenticator()
        authenticator.getData(token);

        if (!category) {
          throw new Error("Category missing")
        }
    
        const userData = new UserData()
        const category_id = await userData.searchCategoryId(category);

        if(!category_id[0]){
            throw new Error("This category doesn't exist")
        }


        let id = category_id[0].id
        const companies = await userData.searchCompanies(id);

        const allCompanies: Array<object> = [];

        for(let obj of companies){
            let company = await userData.searchCompaniesById(obj.company_id)
            allCompanies.push({
                id: company[0].id,
                socialName: company[0].socialName,
                email: company[0].email
            })
        }

        if(!allCompanies[0]){
            throw new Error("No results")
        }
        
        return allCompanies;
      }
}