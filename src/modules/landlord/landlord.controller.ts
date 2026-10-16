import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { landlordServices } from "./landlord.service"
import { sendResponse } from "../../utils/sendResponse"

const createProperty = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
        const payload = req.body
        const {title,description,picture,amenities,location,price,availability,categoryId} = payload
        const landlordId = req.user?.id

        // validation implementation
// r user req body te jei field gula dibe oitar jonno ki ki validation add korbo 
   
        const result = await landlordServices.createPropertyIntoDB(landlordId as string,payload)
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message:'Property created successfully!!',
            data: result 

            
        })

})
const updateProperty = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{})
const deleteProperty = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{})
const getAllRentalRequestsForLandlord = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{})
const updateRentalRequestStatus = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{})



export const landlordController = {
    createProperty,
updateProperty,
deleteProperty,
getAllRentalRequestsForLandlord,
updateRentalRequestStatus
}