import { prisma } from "../../lib/prisma";
import { IRentalRequestPayload } from "./rentalRequest.interface";

const createRentalRequestIntoDB = async (payload: IRentalRequestPayload) => {
  const { propertyId, tenantId } = payload;

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("This property does not exists");
  }

  if (property.availability !== "AVAILABLE") {
    throw new Error("This property is not available for rent");
  }

  const isRentalRequestExist = await prisma.rentalRequest.findFirst({
    where: {
      propertyId,
      tenantId,
    },
  });

  if (isRentalRequestExist) {
    throw new Error("You have already requested for renting that property");
  }

  const createdRentalRequest = await prisma.rentalRequest.create({
    data: {
      ...payload,
    },
  });

  return createdRentalRequest;
};
const getAllRentalRequestFromDB = async (tenantId: string) => {
  await prisma.rentalRequest.updateMany({
    where: {
      tenantId,
      leaseEndDate: {
        lt: new Date(Date.now()),
      },
    },
    data: {
      status: "COMPLETED",
    },
  });

  const allRentalRequests = await prisma.rentalRequest.findMany({
    where: {
      tenantId,
    },
  });

  const totalRentalRequests = allRentalRequests.length;
  return { totalRentalRequests, allRentalRequests };
};

const getRentalRequestByIdFromDB = async (
  rentalRequestId: string,
  tenantId: string,
) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalRequestId,
      tenantId,
    },
    include: {
      property: true,
    },
  });

  if (!rentalRequest) {
    throw new Error(
      "You are not the owner of that rental request so you can't see that request details.",
    );
  }
  return rentalRequest;
};

export const rentalRequestServices = {
  createRentalRequestIntoDB,
  getAllRentalRequestFromDB,
  getRentalRequestByIdFromDB,
};
