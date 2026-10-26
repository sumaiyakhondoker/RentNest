import { PropertyWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IQueryPayload } from "./property.interface";

const getPropertyDetailsByIdFromDB = async (propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      reviews: true,
    },
  });

  if (!property) {
    throw new Error("This property doesn't exist.");
  }

  return property;
};

// const getAllPropertiesFromDB = async (query: IQueryPayload) => {
const getAllPropertiesFromDB = async () => {
  // const limit = query.limit;
  // const page = query.page;
  // const skip = (page - 1) * limit;

  // // sorting
  // const sortBy = query.sortBy;
  // const sortOrder = query.sortOrder;
  // let orderBy =
  //   sortBy?.toLowerCase() === "price"
  //     ? {
  //         [sortBy]: sortOrder,
  //       }
  //     : {};

  // // filtering
  // const location = query.location;
  // const maxPrice = query.maxPrice;
  // const minPrice = query.minPrice;
  // const category = query.category;
  // const amenities = query.amenities;

  // const queryBuilder = [];

  // //   jodi default dei mane price kicu na dei tahole normally desc te ashar kotha na ?
  // queryBuilder.push({
  //   AND: [
  //     { price: { lte: Number(maxPrice) } },
  //     { price: { gte: Number(minPrice) } },
  //   ],
  // });

  // if (category) {
  //   queryBuilder.push({ category: { categoryName: category } });
  // }
  // if (location) {
  //   queryBuilder.push({ location: { equals: location } });
  // }
  // //   if (amenities) {
  // //     queryBuilder.push({ amenities: { hasSome: amenities } });   //amenity howar kotha na nam ta 1st er?
  // //   }

  // const search = query.search;

  // const searchBuilder: PropertyWhereInput[] = [];

  // if (search) {
  //   searchBuilder.push(
  //     {
  //       title: {
  //         contains: search,
  //         mode: "insensitive",
  //       },
  //     },
  //     {
  //       description: {
  //         contains: search,
  //         mode: "insensitive",
  //       },
  //     },
  //   );
  // }

  const allProperties = await prisma.property.findMany({
    //   where: {
    //     AND: queryBuilder,
    //     ...(search && { OR: searchBuilder }),
    //   },
    //   take: limit,
    //   skip,
    //   orderBy,
    // });
    // const totalPropertiesCount = await prisma.property.count({
    //   where: {
    //     AND: queryBuilder,
    //   },
    // });
    // console.log(allProperties.length);
    // return {
    //   data: allProperties,
    //   meta: {
    //     page: page,
    //     limit: limit,
    //     totalProperties: totalPropertiesCount,
    //     totalPages: Math.ceil(totalPropertiesCount / limit),
    //   },
  });
  return { total: allProperties.length, allProperties };
};

export const propertyServices = {
  getAllPropertiesFromDB,
  getPropertyDetailsByIdFromDB,
};
