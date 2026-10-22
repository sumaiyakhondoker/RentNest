import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { landlordServices } from "./landlord.service"
import { sendResponse } from "../../utils/sendResponse"
import { PropertyAvailability, RentalRequestStatus } from '../../../generated/prisma/enums';

const createProperty = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
        const payload = req.body
        const {title,description,picture,amenities,location,price,availability,categoryId} = payload
        
      const uuidRegex =  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

        const landlordId = req.user?.id

        if(!landlordId){
            throw new Error('Landlord id not found')
        }

        if(!title ||  !description || !amenities || !location || !price || !categoryId){
             throw new Error("Property title,description,amenities,location,price and categoryId are required.")
        }

        if(typeof title !== 'string' || typeof description !== 'string' || typeof location !== 'string'  || typeof categoryId !== 'string' || title.trim().length === 0 || description.trim().length === 0 || location.trim().length === 0){
             throw new Error("Property title, description and location must be a valid string.")

        }

        if(picture && typeof picture !== 'string' || picture.trim().length === 0){
             throw new Error("Picture url must be a valid string.")

        }

        if(!Array.isArray(amenities) || amenities.length === 0 || !amenities.every((item)=>typeof item === 'string' && item.trim().length > 0)){
            throw new Error("Amenities must be a non-empty array and should contain valid strings.")
        }

        if(!Number.isInteger(price) ||  price < 0  ){
             throw new Error("Price must be an integer and greater than 0")

        }

        if(availability && availability  !==  PropertyAvailability.AVAILABLE && availability !== PropertyAvailability.RENTED){
                 throw new Error("Property availability  must be either 'AVAILABLE' or 'RENTED'.")
            }

          if(!uuidRegex.test(categoryId)){
    throw new Error('Please give a valid category id.')
  }

        const result = await landlordServices.createPropertyIntoDB(landlordId as string,payload)
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message:'Property details created successfully!!',
            data: result 

            
        })

})
const updateProperty = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const propertyId = req.params.id
    const payload = req.body
       const {title,description,picture,amenities,location,price,availability,categoryId} = payload
        
      const uuidRegex =  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

        const landlordId = req.user?.id

        if(!landlordId){
            throw new Error('Landlord id is required')
        }

   
        if(!propertyId){
            throw new Error('Property id is required in params')
    }

      if(typeof propertyId !== 'string' || !uuidRegex.test(propertyId)){
    throw new Error('Property id must be a string and should be given in a valid format')
  }

   

        if(title && (typeof title !== 'string' || title.trim().length === 0)){
             throw new Error("Property title  must be a valid string.")

        }

        

        if(description && (typeof description !== 'string'  ||   description.trim().length === 0) ){
             throw new Error("Property description  must be a valid string.")

        }

        if(location && (typeof location !== 'string'  || location.trim().length === 0)){
             throw new Error("Property location  must be a valid string.")

        }

        if(picture && (typeof picture !== 'string' || picture.trim().length === 0)){
             throw new Error("Picture url must be a valid string.")

        }

        if(amenities && amenities.length > 0 && (!Array.isArray(amenities) || amenities.length === 0 || !amenities.every((item)=>typeof item === 'string' && item.trim().length > 0))){
            throw new Error("Amenities must be an array of valid strings.")
        }

        if(price && (!Number.isInteger(price) ||  price < 0 ) ){
             throw new Error("Price must be an integer and greater than 0")

        }

        if(availability && availability  !==  PropertyAvailability.AVAILABLE && availability !== PropertyAvailability.RENTED){
                 throw new Error("Property availability  must be either 'AVAILABLE' or 'RENTED'.")
            }

          
    
          if(categoryId && (typeof categoryId !== 'string'|| !uuidRegex.test(categoryId))){
    throw new Error('Please give a valid category id and it must be a string')
  }

    
  const updatedPropertyDetails = await landlordServices.updatePropertyIntoDB(payload, propertyId,landlordId)

  sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message:'Property details updated successfully!!',
            data: updatedPropertyDetails
  })


})

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


const getAllRentalRequestsForLandlord = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
     const landlordId = req.user?.id
     if(!landlordId){
           throw new Error('Landlord id not found')
     }

     const {totalRentalRequests,allRentalRequests} = await landlordServices.getAllRentalRequestsForLandlordFromDB(landlordId)
     sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Rental requests for your properties retrieved successfully.",
            data: {totalRentalRequests,allRentalRequests}
  })

})
const updateRentalRequestStatus = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
     const rentalRequestId = req.params.id
     const landlordId = req.user?.id
     const {status} = req.body
     const uuidRegex =  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i


     if(!landlordId){
          throw new Error('Landlord id not found.')

     } 
     if(!rentalRequestId){
          throw new Error('Rental request id is required in params.')

     }      
     if(typeof rentalRequestId !== 'string' || !uuidRegex.test(rentalRequestId)){
    throw new Error('Please give a valid rental request id and it must be a string')
     }

     if(status !== RentalRequestStatus.APPROVED && status !== RentalRequestStatus.REJECTED){
    throw new Error("Rental request status must be either 'APPROVED' or 'REJECTED'.")

     }


     const updatedRentalRequestDetails = await landlordServices.updateRentalRequestStatusIntoDB(landlordId,rentalRequestId, status)

 sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message:'Rental request status updated successfully!!',
            data: {updatedRentalRequestDetails}
  })
})


export const landlordController = {
    createProperty,
updateProperty,
deleteProperty,
getAllRentalRequestsForLandlord,
updateRentalRequestStatus
}