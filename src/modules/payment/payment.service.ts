import { PaymentProvider, PaymentStatus, RentalRequestStatus } from "../../../generated/prisma/enums"
import config from "../../config"
import { prisma } from "../../lib/prisma"
import { stripe } from "../../lib/stripe"

const createPaymentIntoDB = async(tenantId:string, rentalRequestId: string)=>{

    
    
    const rentalRequest = await prisma.rentalRequest.findFirst({
        where:{
            id:rentalRequestId,
            tenantId
        },
        include:{
            property:true
        }

    })

    if(!rentalRequest){
        throw new Error("You are not authorized to create a payment for this rental request.")
    }

    if(rentalRequest.status !== RentalRequestStatus.APPROVED){
        throw new Error("Payment can only be initiated for approved rental requests.")

    }


    const amount = rentalRequest.property.price

    const isPaymentExist = await prisma.payment.findUnique({
        where:{
            rentalRequestId
        }
    })

    if(isPaymentExist){
        throw new Error("A payment record already exists for this rental request.")
    }
    const createdPayment = await prisma.payment.create({
        data:{
            rentalRequestId,
            amount,
            method:'CARD',
            provider: PaymentProvider.STRIPE,
            status:PaymentStatus.PENDING
        }
    })

    let session;
try {
     session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
        {
            price_data: {
                currency: "bdt",
                product_data: {
                    name: rentalRequest.property.title,
                },
                unit_amount: amount * 100,
            },
            quantity: 1,
        },
    ],
    success_url: `${config.app_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.app_url}/payment/cancel`,
    metadata: {
        paymentId: createdPayment.id,
        rentalRequestId,
        tenantId,
    },
});
} catch (error) {
    await prisma.payment.update({
    where:{
        id: createdPayment.id
    },
    data:{
        status: PaymentStatus.FAILED
    }
})

throw error
}


const updatedPayment = await prisma.payment.update({
    where:{
        id: createdPayment.id
    },
    data:{
        transactionId: session.id
    }
})

return {
    payment: updatedPayment,
    checkoutUrl : session.url
}



}

export const paymentServices = {
    createPaymentIntoDB 
}

