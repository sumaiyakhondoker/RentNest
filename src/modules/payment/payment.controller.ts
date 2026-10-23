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


const confirmPayment =  catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
        const signature = req.headers["stripe-signature"];

        if (!signature || Array.isArray(signature)) {
           throw new Error("Missing or invalid Stripe signature.")
        }

        const result = await paymentServices.confirmPaymentIntoDB(req.body as Buffer,signature);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Stripe webhook received successfully!!",
            data: result,
        });
    })
const getMyPayments = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

  const tenantId = req.user?.id

  if(!tenantId){
    throw new Error("Tenant id not found.")
  }

  const allPayments = await paymentServices.getMyPaymentsFromDB(tenantId)

const message = allPayments.length > 0 ?  "Payment history retrieved successfully.": "No payment record found"


    sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message,
            data: allPayments,
        });
})
const getPaymentById = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

  const paymentId = req.params.id
    const tenantId = req.user?.id

  if(!tenantId){
    throw new Error("Tenant id not found.")
  }
  if(!paymentId){
    throw new Error("Payment id is required in params.")
  }

  const result = await paymentServices.getPaymentByIdFromDB(paymentId as string, tenantId)
  sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Payment details retrived successfully!!",
            data: result,
        });
})

export const paymentController = {
    createPayment,
    confirmPayment,
    getMyPayments,
getPaymentById
}