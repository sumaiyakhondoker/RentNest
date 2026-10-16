import  httpStatus  from 'http-status';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { propertyServices } from "./property.service"
import { sendResponse } from "../../utils/sendResponse"



const getAllProperties = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const {totalProperties, allProperties} = await propertyServices.getAllPropertiesFromDB()
   

  sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message:'All properties retrived successfully!!',
            data: {totalProperties, allProperties}
  })
})
const getPropertyDetailsById = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const propertyId = req.params.id
     const uuidRegex =  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if(!propertyId){
        throw new Error('Property id is required in params')
    }

     if(typeof propertyId !== 'string' || !uuidRegex.test(propertyId)){
    throw new Error('Property id must be a string and should be given in a valid format')
  }

  const propertyDetails = await propertyServices.getPropertyDetailsByIdFromDB(propertyId)
   

  sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message:'Property details retrived successfully!!',
            data: propertyDetails
  })


})
export const propertyController = {
    getAllProperties,
getPropertyDetailsById
}