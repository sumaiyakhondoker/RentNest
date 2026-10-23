import  httpStatus  from 'http-status';
import { NextFunction, Request, Response } from "express"
import { Prisma } from '../../generated/prisma/client';

export const globalErrorHandler = (error:any, req:Request, res: Response, next:NextFunction)=>{
    console.log("Error: ", error);

    let statusCode ;
    let errorMessage = error.message || "Internal server error!"

    if(error instanceof Prisma.PrismaClientValidationError){
         statusCode = httpStatus.BAD_REQUEST,
         errorMessage = "You have provided incorrect field type or missing fields."

    }else if(error instanceof Prisma.PrismaClientKnownRequestError){
        if(error.code === 'P2002'){
            statusCode = httpStatus.BAD_REQUEST
            errorMessage= "Duplicate Key Error."
        }else if(error.code === 'P2003'){
            statusCode = httpStatus.BAD_REQUEST
            errorMessage= "Foreign key constraint failed." 
        }else if(error.code === 'P2025'){
            statusCode = httpStatus.BAD_REQUEST
            errorMessage=  "An operation failed because it depends on one or more records that were required but not found." 
        }else if(error.code === 'P2028'){
            statusCode = httpStatus.INTERNAL_SERVER_ERROR
            errorMessage=  "A database transaction failed.." 
        }
    }else if(error instanceof Prisma.PrismaClientInitializationError){
        if(error.errorCode === 'P1000'){
             statusCode = httpStatus.UNAUTHORIZED
            errorMessage=  "Authentication failed against database server. Please check your credentails."
        }else if(error.errorCode === 'P1001'){
             statusCode = httpStatus.BAD_REQUEST
            errorMessage=  "Can't reach database server."
        }
    }else if(error instanceof Prisma.PrismaClientUnknownRequestError){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR,
         errorMessage = "Error occurred during query execution."
    }

    res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            message: errorMessage,
            errorDetails: error


           }) 
}