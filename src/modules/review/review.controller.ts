import  httpStatus  from 'http-status';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { reviewServices } from "./review.service";
import { sendResponse } from "../../utils/sendResponse";



const createReview = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

    const tenantId = req.user?.id

    

    const {propertyId, rating, comment} = req.body
    

      const uuidRegex =  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i


     if(!tenantId){
      throw new Error('Tenant id is not found')
    }  
    if(!propertyId || !rating){
         throw new Error('Property id and rating are required')
    }

    if(typeof propertyId !== 'string' || !uuidRegex.test(propertyId)){
    throw new Error('Property id must be a string and should be given in a valid format')
  }

  
  if(!Number.isInteger(rating) || rating < 1 || rating > 5){
    throw new Error('Rating should be an integer and rating number must be between 1 and 5')
  }

    if(comment && typeof comment !== 'string'){
     throw new Error('Comment must be a string')
  }

  const reviewPayload = {
    propertyId, rating, comment,tenantId

  } 
  const result = await reviewServices.createReviewIntoDB(reviewPayload)

  sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message:'Review created successfully!!',
            data: result
  })

})

export const reviewController = {
    createReview
}