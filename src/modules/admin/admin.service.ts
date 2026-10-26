import { AccountStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
  const allUsers = await prisma.user.findMany({
    omit: {
      password: true,
    },
  });
  const countTotalUsers = allUsers.length;
  return {
    totalUsers: countTotalUsers,
    allUsers,
  };
};

const updateUserStatusIntoDB = async (
  accountStatus: AccountStatus,
  userId: string,
) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("This user does not exist.");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      accountStatus,
    },
    omit: {
      password: true,
    },
  });

  return updatedUser;
};
const getAllPropertiesFromDB = async () => {
  const allProperties = await prisma.property.findMany();
  return allProperties;
};
const getAllRentalRequestsFromDB = async () => {
  const allRentalRequests = await prisma.rentalRequest.findMany();
  return allRentalRequests;
};

export const adminServices = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
  getAllPropertiesFromDB,
  getAllRentalRequestsFromDB,
};
