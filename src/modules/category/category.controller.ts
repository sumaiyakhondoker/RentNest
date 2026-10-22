import  httpStatus  from 'http-status';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { categoryServices } from "./category.service"
import { sendResponse } from "../../utils/sendResponse"

const createCategory =  catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const payload = req.body


    const {categoryName, description} = payload;

   
    if(!categoryName || !description){
        throw new Error('Category name and description are required')
    }
    if( typeof categoryName !== 'string' || typeof description !== 'string'){
        throw new Error('Category name and description must be a string')
    }

    const result = await categoryServices.createCategoryintoDB(payload)
    sendResponse(res, {
        success: true,
    statusCode:httpStatus.CREATED,
    message: "New category created successfully!!",
    data: result
    })
})
const getAllCategories =  catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const {totalCategories,allCategoriesDetails} = await categoryServices.getAllCategoriesFromDB()
     sendResponse(res, {
        success: true,
    statusCode:httpStatus.OK,
    message: "All categories retrived successfully!!",
    data: {totalCategories,allCategoriesDetails}
    })
})


export const categoriesController = {
    createCategory,
    getAllCategories
}


