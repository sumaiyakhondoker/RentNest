import { Response } from "express";


type TMeata = {
    page:number,
    limit: number,
    total:number
}
type TResponseData<T,Q> = {
    success:boolean,
    statusCode: number,
    message:string,
    data?:T,
    errorDetails?: Q,
    meta?: TMeata
}


export const sendResponse =<T,Q>(res:Response, data: TResponseData<T,Q>)=>{
    res.status(data.statusCode).json({
        success:data.success,
        statusCode:data.statusCode,
        message:data.message,
        data:data.data,
        meta:data.meta,
        errorDetails: data.errorDetails
    })
}