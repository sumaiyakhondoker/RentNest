import { prisma } from "../../lib/prisma"
import { ICreatePropertyPayload, IUpdatePropertyPayload} from "./landlord.interface"



const createPropertyIntoDB = async(landlordId:string,payload: ICreatePropertyPayload)=>{

    const {title, location, categoryId} = payload
    const isPropertyExist = await prisma.property.findFirst({
        where:{
            landlordId,
            title,
            categoryId,
            location
        }
    })

    if(isPropertyExist){
        throw new Error("This property already exist. Please give a new property details.")
    }

    const isCategoryExist = await prisma.category.findUnique({
        where:{
            id:categoryId
        }
    })
if(!isCategoryExist){
        throw new Error("This category id doesn't exist.")
    }

    
    const result = await prisma.property.create({
        data:{
            
            ...payload,
            landlordId
        }

    })

    return result
}
const updatePropertyIntoDB = async(payload:IUpdatePropertyPayload, propertyId:string, landlordId:string)=>{
    const property = await prisma.property.findUnique({
        where:{
            id: propertyId

        }
    })

    
    if(!property){
        throw new Error("Property doesn't exist.")

    }

    
     if(property?.landlordId !== landlordId){
        throw new Error("You can't update this property details because you are not the landlord of that property.")
    }

 

    const result  = await prisma.property.update({
        where:{
            id:propertyId
        },
        data:{
            ...payload
        }
    })

    return result

}


const deletePropertyFromDB = async(propertyId:string, landlordId:string)=>{
    const property = await prisma.property.findUnique({
        where:{
            id: propertyId

        }
    })

    
    if(!property){
        throw new Error("Property doesn't exist.")

    }

    
     if(property?.landlordId !== landlordId){
        throw new Error("You are not the landlord of that property. So you can't delete that property details.")
    }
   
    await prisma.property.delete({
        where:{
            id:propertyId
        }
    })
}
const getAllRentalRequestsForLandlordFromDB = async(landlordId:string)=>{

    const allRentalRequests = await prisma.rentalRequest.findMany({
        where:{
            property:{
               landlordId
            }
        }
    })

    const totalRentalRequests = allRentalRequests.length
    return {totalRentalRequests,allRentalRequests}





}
const updateRentalRequestStatusIntoDB = async()=>{}

export const landlordServices = {
createPropertyIntoDB,
updatePropertyIntoDB,
deletePropertyFromDB,
getAllRentalRequestsForLandlordFromDB,
updateRentalRequestStatusIntoDB
}