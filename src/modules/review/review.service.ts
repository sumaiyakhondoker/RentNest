import { prisma } from "../../lib/prisma"
import { IReviewPayload } from "./review.interface"


const createReviewIntoDB = async(payload:IReviewPayload)=>{
    // const Payload
    const createdReview = await prisma.review.create({
    data:{
        
        ...payload
        
    }
})

return createdReview
}


export const reviewServices= {
    createReviewIntoDB
}
