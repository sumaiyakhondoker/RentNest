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
const getPropertyDetailsById = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{})
export const propertyController = {
    getAllProperties,
getPropertyDetailsById
}