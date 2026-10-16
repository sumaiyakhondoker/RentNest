import { prisma } from "../../lib/prisma";
import { ICategoryPayload } from "./category.interface"



const createCategoryintoDB =async(payload:ICategoryPayload)=>{
    const {categoryName,description} = payload;
    const isCategoryNameExist = await prisma.category.findUnique({
        where:{
            categoryName
        }
    })

    if(isCategoryNameExist){
        throw new Error("This category already exist. Please give a new category name.")
    }
    const createdCategory = await prisma.category.create({
        data:{
            ...payload
        }
    })
    return createdCategory
}
const getAllCategoriesFromDB =async()=>{
    const allCategoriesDetails = await prisma.category.findMany()
    const totalCategories = allCategoriesDetails.length
    return {totalCategories,allCategoriesDetails}
}


export const categoryServices = {
    createCategoryintoDB,
    getAllCategoriesFromDB
}