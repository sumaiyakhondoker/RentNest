import { Request, Response } from "express"

export const notFound = (req:Request, res: Response)=>{
    res.status(404).json({
        success:false,
        message:"Route not found.",
        errorDetails: `The requested route ${req.originalUrl} does not exist`
    })
}