
import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { authServices } from "./auth.service"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"




const registerUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
const payload = req.body
const regexOfEmail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const {name,email, password} = payload

if(!name || !email || !password){
    return sendResponse(res, {
        success:false,
        statusCode:httpStatus.BAD_REQUEST,
         message:'Name, email and password fields are required',
         errorDetails: null

    })
}

if(typeof name !== "string" || name.trim().length < 3 ){
 return sendResponse(res, {
    success: false,
    statusCode:httpStatus.BAD_REQUEST,
    message: "Name must be at least 3 characters",
    errorDetails: null
  })
} 

if(typeof email !== "string" || !regexOfEmail.test(email) ){
 return sendResponse(res, {
    success: false,
    statusCode:httpStatus.BAD_REQUEST,
    message: "Please provide a valid email address",
    errorDetails: null
  })
} 


if(typeof password !== "string" || password.length < 7 ){
 return sendResponse(res, {
    success: false,
    statusCode:httpStatus.BAD_REQUEST,
    message: "Password must be at least 7 characters",
    errorDetails: null
  })
} 

const user = await authServices.registerUser(payload)

 sendResponse(res, {
         success: true,
            statusCode: httpStatus.CREATED,
            message:'User registered successfully!!',
            data:{
                user
            }
    })


        
})

const loginUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
const payload = req.body

const regexOfEmail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const {email, password} = payload

if(!email || !password){
    return sendResponse(res, {
        success:false,
        statusCode:httpStatus.BAD_REQUEST,
         message:'Email and password fields are required',
         errorDetails: null

    })
}

if(typeof email !== "string" || !regexOfEmail.test(email)){
 return sendResponse(res, {
    success: false,
    statusCode:httpStatus.BAD_REQUEST,
    message: "Please provide a valid email address",
    errorDetails: null
  })
} 


if(typeof password !== "string"){
 return sendResponse(res, {
    success: false,
    statusCode:httpStatus.BAD_REQUEST,
    message: "Password must be a string",
    errorDetails: null
  })
} 

const {accessToken, refreshToken} = await authServices.loginUser(payload)

res.cookie("accessToken", accessToken, {
  httpOnly:true,
  secure:false,
  sameSite:"none",
  maxAge: 1000 * 60 * 60 * 24
})

res.cookie("refreshToken", refreshToken, {
  httpOnly:true,
  secure:false,
  sameSite:"none",
  maxAge: 1000 * 60 * 60 * 24 * 7
})


sendResponse(res, {
     success: true,
            statusCode: httpStatus.OK,
            message:'User logged in successfully!!',
            data:{
             accessToken,
             refreshToken
            }
})

})


export const authController = {
    registerUser,
    loginUser
} 
