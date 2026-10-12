import bcrypt from 'bcryptjs'
import config from '../../config'
import { prisma } from '../../lib/prisma'
import { IRegisterUserPayload } from './auth.interface'

const registerUser = async(payload: IRegisterUserPayload)=>{
    const {name,email, password, phone,role, profileImage} = payload

    const isUserExist = await prisma.user.findUnique({
    where:{email}
})

if(isUserExist){
    throw new Error ('A user with this email already exists.')
}

const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

const createdUser = await prisma.user.create({
    data:{
        name,
        email,
        password:hashedPassword,
        phone, 
        role,
        profileImage

    }
})

const user = await prisma.user.findUnique({
    where:{
        id:createdUser.id,
        email: createdUser.email || email

    },
    omit:{
        password:true
    }
})

return user;
}



export const authServices = {
    registerUser
} 
