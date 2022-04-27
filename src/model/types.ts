interface UserTypeKey {
    [key: string]: string | number
}


export interface UserInputDTO extends UserTypeKey{
    name: string,
    email: string,
    password: string
}

export interface UserInputData extends UserInputDTO{
    id:string
}




