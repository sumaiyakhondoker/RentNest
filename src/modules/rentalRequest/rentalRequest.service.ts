import { prisma } from "../../lib/prisma"
import { IRentalRequestPayload } from "./rentalRequest.interface"



const createRentalRequestIntoDB = async(payload:IRentalRequestPayload)=>{
    const createdRentalRequest = await prisma.rentalRequest.create({
        data:{
            ...payload
        }
    })
    
    return createdRentalRequest
}
const getAllRentalRequestFromDB = async()=>{}
const getRentalRequestByIdFromDB = async()=>{}

export const rentalRequestServices = {
    createRentalRequestIntoDB,
getAllRentalRequestFromDB,
getRentalRequestByIdFromDB
}


