import  httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { rentalRequestServices } from "./rentalRequest.service"
import { sendResponse } from "../../utils/sendResponse"
import { IRentalRequestPayload } from './rentalRequest.interface';


const createRentalRequest = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

    const tenantId =  req.user?.id

    if(!tenantId){
      throw new Error('Tenant id is not found')
    }
let { propertyId,
  moveInDate,
  message
  } = req.body


  const uuidRegex =  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  if(!propertyId){
    throw new Error('Property id is required')
  }
  if(typeof propertyId !== 'string' || !uuidRegex.test(propertyId)){
    throw new Error('Property id must be a string and should give in a valid format')
  }

 

  if(moveInDate &&  (typeof moveInDate !== "string" || Number.isNaN(Date.parse(moveInDate)))){
    throw new Error("Please provide a valid move in date like this: 'YYYY-MM-DD'")

  }

  if(message && typeof message !== 'string'){
     throw new Error('Message must be a string')
  }

const parsedMoveInDate = new Date(moveInDate)

  const rentalRequestData:IRentalRequestPayload = {
  propertyId,
  moveInDate:parsedMoveInDate,
  message,
  tenantId
  }

  const result = await rentalRequestServices.createRentalRequestIntoDB(rentalRequestData)
  sendResponse(res, {
    success: true,
            statusCode: httpStatus.OK,
            message:'Rental request created successfully!!',
            data: result
  })



})
const getAllRentalRequest = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{})
const getRentalRequestById = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{})


export const rentalRequestController = {
    createRentalRequest,
getAllRentalRequest,
getRentalRequestById
}