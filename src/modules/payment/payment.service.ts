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


    const amount = rentalRequest.property.price

    const isPaymentExist = await prisma.payment.findUnique({
        where:{
            rentalRequestId
        }
    })

    if(isPaymentExist){
        throw new Error("A payment record already exists for this rental request.")
    }

       if(rentalRequest.status !== RentalRequestStatus.APPROVED){
        throw new Error("Payment can only be initiated for approved rental requests.")

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


const handleStripeWebhookIntoDB = async (payload: Buffer,signature: string) => {
    const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        config.stripe_webhook_secret
    );

    if (event.type !== "checkout.session.completed") {
        return { received: true };
    }

    const session = event.data.object;

    if (session.payment_status !== "paid") {
        return { received: true };
    }

    const paymentId = session.metadata?.paymentId;
    const rentalRequestId = session.metadata?.rentalRequestId;


    if (!paymentId || !rentalRequestId) {
        throw new Error("Payment metadata is missing.");
    }


   


    await prisma.$transaction(async (tx) => {
        const payment = await tx.payment.findUnique({
            where: { id: paymentId },
        });

        if (!payment) {
            throw new Error("Payment record not found.");
        }

        if (payment.rentalRequestId !== rentalRequestId) {
            throw new Error("Payment rental request mismatch.");
        }

        if (payment.status === PaymentStatus.COMPLETED) {
            return;
        }

        const rentalRequest = await tx.rentalRequest.findUnique({
            where: { id: rentalRequestId },
        });

        if (!rentalRequest) {
            throw new Error("Rental request not found.");
        }

        if (rentalRequest.status !== RentalRequestStatus.APPROVED) {
            throw new Error("Rental request is not approved.");
        }


        await tx.payment.update({
            where: { id: paymentId },
            data: {
                status: PaymentStatus.COMPLETED,
                paidAt: new Date(),
                transactionId: session.id,
            },
        });

        await tx.rentalRequest.update({
            where: { id: rentalRequestId },
            data: { status: RentalRequestStatus.ACTIVE },
        });
    },
     {
        maxWait: 10000,
        timeout: 20000,
    }

);

    return { received: true };
};


const getMyPaymentsFromDB = async(tenantId:string)=>{
    const allPayments = await prisma.payment.findMany({
        where:{
            rentalRequest:{
                tenantId
            }
        },
        include:{
            rentalRequest:true
        }
    })

    return allPayments
}
const getPaymentByIdFromDB = async(paymentId:string, tenantId:string)=>{
const paymemtDetails  = await prisma.payment.findUniqueOrThrow({
    where:{
        id:paymentId,
        rentalRequest:{
            tenantId
        }
    },
    include:{
        rentalRequest:true
    }
})


return paymemtDetails

}

export const paymentServices = {
    createPaymentIntoDB,
    handleStripeWebhookIntoDB,
    getMyPaymentsFromDB,
    getPaymentByIdFromDB

}

