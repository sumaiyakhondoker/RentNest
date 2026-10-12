
import { Role } from "../../../generated/prisma/enums"




export interface IRegisterUserPayload {
    name:string
    email:string
    password:string
    phone?: string
    role?: Role
    profileImage?: string
}



export interface ILoginUserPayload {
   
    email:string
    password:string
    
   
}