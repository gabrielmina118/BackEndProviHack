import * as bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

export class HashManager{

    public async hashCreate(pass:string):Promise<string>{
        const rounds:number = Number(process.env.COST);
        const salt:string = await bcrypt.genSalt(rounds);
        const result:string = await bcrypt.hash(pass, salt);
        return result;
    }

    public async compare(text: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(text, hash);
    }
}