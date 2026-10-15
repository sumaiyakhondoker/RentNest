import { AccountStatus } from './../../../generated/prisma/enums';
import  httpStatus  from 'http-status';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { adminServices } from "./admin.service"
import { sendResponse } from '../../utils/sendResponse';




const getAllUsers = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const result = await adminServices.getAllUsersFromDB()
    sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message:'All users retrived successfully!!',
            data: result
  })
})

const updateUserStatus = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const userId = req.params.id
      const uuidRegex =  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    const {accountStatus} = req.body
    
    if(!userId){
         throw new Error("User id is required")
    }

    if(typeof userId !== 'string' || !uuidRegex.test(userId) ){
         throw new Error("User id must be a string and should be given in a valid format.")
    }
    if(!accountStatus || accountStatus === " "){
        throw new Error("Account status is required and should be given a valid string")
    }

    if(typeof accountStatus !== 'string'){
        throw new Error("Account status must be a valid string")
    }

    if(accountStatus !==  AccountStatus.ACTIVE && accountStatus !== AccountStatus.BANNED){
         throw new Error("Account status must be either 'ACTIVE' or 'BANNED'.")
    }

    const result = await adminServices.updateUserStatusIntoDB(accountStatus, userId)
    sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message:'User account status updated successfully!!',
            data: result
  })

    
})


// const getAllProperties = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
//     const result = await adminServices.getAllPropertiesFromDB()
//     sendResponse(res, {
//             success: true,
//             statusCode: httpStatus.OK,
//             message:'All properties retrived successfully!!',
//             data: result
//   })
// })
// const getAllRentalRequests = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
//     const result = await adminServices.getAllRentalRequestsFromDB()
//     sendResponse(res, {
//             success: true,
//             statusCode: httpStatus.OK,
//             message:'All rental requests retrived successfully!!',
//             data: result
//   })
// })

export const adminController = {
    getAllUsers,
updateUserStatus,
// getAllProperties,
// getAllRentalRequests
}