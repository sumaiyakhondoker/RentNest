import bcrypt from 'bcryptjs'
import config from '../../config'
import { prisma } from '../../lib/prisma'
import { ILoginUserPayload, IRegisterUserPayload } from './auth.interface'
import { jwtUtils } from '../../utils/jwt'
import { SignOptions } from 'jsonwebtoken'

const registerUserIntoDB = async(payload: IRegisterUserPayload)=>{
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

const loginUserIntoDB = async(payload: ILoginUserPayload)=>{
    const {email, password} = payload

    const user = await prisma.user.findUniqueOrThrow({
        where:{email}
    })

    if(user.accountStatus === 'BANNED'){
        throw new Error("Your account has been banned. Please contact to the support team")
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if(!isPasswordMatched){
        throw new Error("Invalid credentials!")
    }

    const jwtPayload = {
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }

    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in as SignOptions)

    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in as SignOptions)

    return {accessToken,refreshToken}
}

const getMyProfileFromDB = async(userId:string)=>{
const user = await prisma.user.findUniqueOrThrow({
    where:{
        id:userId,
        
    },
    omit:{
            password:true
        }
})

return user
}

export const authServices = {
    registerUserIntoDB,
    loginUserIntoDB,
    getMyProfileFromDB
} 
   