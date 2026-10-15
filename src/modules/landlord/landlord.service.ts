import { prisma } from "../../lib/prisma"
import { ICreatePropertyPayload} from "./landlord.interface"



const createPropertyIntoDB = async(landlordId:string,payload: ICreatePropertyPayload)=>{

    const result = await prisma.property.create({
        data:{
            
            ...payload,
            landlordId
        }

    })

    console.log(result);

    return result
}
const updatePropertyIntoDB = async()=>{}
const deletePropertyFromDB = async()=>{}
const getAllRentalRequestsForLandlordFromDB = async()=>{}
const updateRentalRequestStatusIntoDB = async()=>{}

export const landlordServices = {
createPropertyIntoDB,
updatePropertyIntoDB,
deletePropertyFromDB,
getAllRentalRequestsForLandlordFromDB,
updateRentalRequestStatusIntoDB
}