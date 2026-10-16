import { prisma } from "../../lib/prisma"

const getAllPropertiesFromDB = async()=>{

    const allProperties = await prisma.property.findMany()
    const totalProperties = allProperties.length
    return {totalProperties, allProperties}
}
const getPropertyDetailsByIdFromDB = async(propertyId:string)=>{
    const property = await prisma.property.findUniqueOrThrow({
        where:{
            id: propertyId

        }
    })

    return property
}
export const propertyServices = {
    getAllPropertiesFromDB,
getPropertyDetailsByIdFromDB
}