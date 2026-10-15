import { prisma } from "../../lib/prisma"
import { IReviewPayload } from "./review.interface"

const createReviewIntoDB = async(payload:IReviewPayload, tenantId:string)=>{
    const createdReview = await prisma.review.create({
    data:{
         tenantId,
        ...payload
        
    }
})

return createdReview
}


export const reviewServices= {
    createReviewIntoDB
}
