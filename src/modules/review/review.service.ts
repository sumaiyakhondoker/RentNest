import { prisma } from "../../lib/prisma";
import { IReviewPayload } from "./review.interface";

const createReviewIntoDB = async (payload: IReviewPayload) => {
  const { propertyId, tenantId } = payload;
  const isPropertyExist = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!isPropertyExist) {
    throw new Error(
      "You can't create review because this property does not exist.",
    );
  }

  const rentalRequest = await prisma.rentalRequest.findFirst({
    where: {
      propertyId,
      tenantId,
    },
  });

  if (!rentalRequest) {
    throw new Error(
      "You are not the tenant of that property so you can't create review.",
    );
  }

  if (rentalRequest.status !== "COMPLETED") {
    throw new Error("Your rental request status is not COMPLETED.");
  }

  const createdReview = await prisma.review.create({
    data: {
      ...payload,
    },
  });

  return createdReview;
};

export const reviewServices = {
  createReviewIntoDB,
};
