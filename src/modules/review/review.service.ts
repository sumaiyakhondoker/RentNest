import { prisma } from "../../lib/prisma"
import { IReviewPayload } from "./review.interface"


const createReviewIntoDB = async(payload:IReviewPayload)=>{
    const {propertyId,tenantId}= payload
    const isPropertyExist = await prisma.property.findUnique({
        where:{
            id:propertyId
        }
    })

    if(!isPropertyExist){
        throw new Error("You can't create review because this property does not exist.")
    }

    const isRentalRequestCompleted = await prisma.rentalRequest.findFirst({
        where:{
            propertyId,
            tenantId,
            status: 'COMPLETED'

        }
    })

    if(!isRentalRequestCompleted){
        throw new Error("Your rental request not found or it's status is not completed.")

    }


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
