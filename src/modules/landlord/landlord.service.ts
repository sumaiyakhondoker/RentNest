import { prisma } from "../../lib/prisma"
import { ICreatePropertyPayload} from "./landlord.interface"



// const createPropertyIntoDB = async(landlordId:string,payload: ICreatePropertyPayload)=>{

//     const {title, location} = payload
//     const isPropertyExist = await prisma.property.findFirst({
//         where:{
//             landlordId,
//             title,
//             location
//         }
//     })

//     if(isPropertyExist){
//         throw new Error("This property already exist. Please give a new property details.")
//     }

//     const result = await prisma.property.create({
//         data:{
            
//             ...payload,
//             landlordId
//         }

//     })

//     console.log(result);

//     return result
// }
const updatePropertyIntoDB = async()=>{}
const updatePropertyAvailabilityIntoDB = async()=>{}

const deletePropertyFromDB = async(propertyId:string, landlordId:string)=>{
    const property = await prisma.property.findUnique({
        where:{
            id: propertyId

        }
    })

    
    if(!property){
        throw new Error("Property doesn't exist.")

    }

    console.log('from prev',landlordId, 'from property',property.landlordId);
     if(property?.landlordId !== landlordId){
        throw new Error("You are not the landlord of that property. So you can't delete that property details.")
    }
   
    await prisma.property.delete({
        where:{
            id:propertyId
        }
    })
}
const getAllRentalRequestsForLandlordFromDB = async()=>{}
const updateRentalRequestStatusIntoDB = async()=>{}

export const landlordServices = {
// createPropertyIntoDB,
updatePropertyIntoDB,
updatePropertyAvailabilityIntoDB,
deletePropertyFromDB,
getAllRentalRequestsForLandlordFromDB,
updateRentalRequestStatusIntoDB
}