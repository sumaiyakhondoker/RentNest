import  httpStatus  from 'http-status';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync"
import { jwtUtils } from "../utils/jwt"
import config from "../config"
import { JwtPayload } from "jsonwebtoken"
import { Role } from "../../generated/prisma/enums"
import { sendResponse } from "../utils/sendResponse"
import { prisma } from '../lib/prisma';


declare global {
    namespace Express {
        interface Request{
            user?: {
                id:string;
                name:string;
                email:string;
                role: Role
            }
        }
    }
}


export const auth = (...requiredRoles: Role[])=>{
    return catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

        const token = req.cookies.accessToken ?  req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization.split(" ")[1] : req.headers.authorization




        if(!token){
            throw new Error("You are not authorized. Please log in.")
        }
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret)

        if(!verifiedToken.success){
            throw new Error(verifiedToken.error)
        }

        const {id,name,email,role} = verifiedToken.data as JwtPayload

        if(requiredRoles.length && !requiredRoles.includes(role)){
            sendResponse(res, {
                success: false,
            statusCode: httpStatus.FORBIDDEN,
            message:  "You do not have permission to access this resource."
,
            })
        }

        const user = await prisma.user.findUniqueOrThrow({
            where:{
                id,name,email,role
            }
        })

        if(!user){
            throw new Error("User not found. Please login again.")
        }

        if(user.accountStatus === 'BANNED'){
            throw new Error("Your account has been banned. Please contact to the support team.")
        }

        req.user = {
            id,name,email,role
        }


        next()



    })
}