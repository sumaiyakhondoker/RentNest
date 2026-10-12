
import { Role } from "../../../generated/prisma/enums"




export interface RegisterUserPayload {
    name:string
    email:string
    password:string
    phone?: string
    role?: Role
    profileImage?: string
}