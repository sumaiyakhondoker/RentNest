import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { landlordServices } from "./landlord.service"
import { sendResponse } from "../../utils/sendResponse"

// const createProperty = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
//         const payload = req.body
//         const {title,description,picture,amenities,location,price,availability,categoryId} = payload
//         const landlordId = req.user?.id

//         // validation implementation
// // r user req body te jei field gula dibe oitar jonno ki ki validation add korbo 
   
//         const result = await landlordServices.createPropertyIntoDB(landlordId as string,payload)
//         sendResponse(res, {
//             success: true,
//             statusCode: httpStatus.OK,
//             message:'Property details created successfully!!',
//             data: result 

            
//         })

// })
const updateProperty = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{})
const updatePropertyAvailability = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{})

const deleteProperty = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const propertyId = req.params.id
    const landlordId = req.user?.id
    const uuidRegex =  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if(!propertyId ){
         throw new Error('Property id is required in params')
    }
    if(!landlordId){
         throw new Error('Landlord id is required')

    }
    if(typeof propertyId !== 'string' || !uuidRegex.test(propertyId)){
    throw new Error('Property id must be a string and should be given in a valid format')
  }
  if(typeof landlordId !== 'string' || !uuidRegex.test(landlordId)){
    throw new Error('Landlord id must be a string and should be given in a valid format')
  }
    await landlordServices.deletePropertyFromDB(propertyId,landlordId)
    sendResponse(res,{
        success: true,
            statusCode: httpStatus.OK,
            message:'Property details deleted successfully!!',
            data: null
    })

})
const getAllRentalRequestsForLandlord = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{})
const updateRentalRequestStatus = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{})


export const landlordController = {
    // createProperty,
updateProperty,
updatePropertyAvailability,
deleteProperty,
getAllRentalRequestsForLandlord,
updateRentalRequestStatus
}