import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";



const createPayment = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
const {rentalRequestId} = req.body
const tenantId = req.user?.id
  const uuidRegex =  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i


  if(!tenantId){
    throw new Error('Tenant id is not found.')

  }
  if(!rentalRequestId){
    throw new Error('Rental request id is required')
  }
  if(typeof rentalRequestId !== 'string' || !uuidRegex.test(rentalRequestId)){
    throw new Error('Rental request id must be a string and should be given in a valid format')
  }



  const result = await paymentServices.createPaymentIntoDB(tenantId as string,rentalRequestId)
   sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message:'Checkout session created successfully!!',
            data: result
  })

})

export const paymentController = {
    createPayment
}