import { prisma } from "../../lib/prisma"

const getAllPropertiesFromDB = async()=>{

    const allProperties = await prisma.property.findMany()
    const totalProperties = allProperties.length
    return {totalProperties, allProperties}
}
const getPropertyDetailsByIdFromDB = async()=>{}
export const propertyServices = {
    getAllPropertiesFromDB,
getPropertyDetailsByIdFromDB
}