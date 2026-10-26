import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { propertyServices } from "./property.service";
import { sendResponse } from "../../utils/sendResponse";
import { IQueryPayload } from "./property.interface";

const getAllProperties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const amenities = req.query.amenity;

    const {
      minPrice,
      maxPrice,
      limit,
      page,
      sortBy,
      sortOrder,
      category,
      location,
      search,
    } = query;

    if (minPrice) {
      if (Number.isNaN(minPrice) || Number(minPrice) <= 0)
        throw new Error("Min price must be a number which is greater than 0.");

      if (
        maxPrice &&
        (Number.isNaN(maxPrice) || Number(minPrice) > Number(maxPrice))
      )
        throw new Error(
          "Max price must be a number which should be greater than min price.",
        );
    }

    if (maxPrice) {
      if (Number.isNaN(maxPrice) || Number(maxPrice) <= 0)
        throw new Error("Max price must be a number which is greater than 0.");

      if (
        minPrice &&
        (Number.isNaN(minPrice) || Number(minPrice) > Number(maxPrice))
      )
        throw new Error(
          "Min price must be a number which should be less than max price.",
        );
    }

    if (page && (Number.isNaN(page) || Number(page) < 1)) {
      throw new Error("Page must be a number which is greater than 0.");
    }

    if (limit && (Number.isNaN(limit) || Number(limit) < 1)) {
      throw new Error("Limit must be a number which is greater than 0.");
    }

    const sortByEnums = ["price", "title", "createdAt"];

    if (sortBy && !sortByEnums.includes(String(sortBy))) {
      throw new Error(
        "Sort by must be either 'price' or 'title' or 'createdAt'.",
      );
    }

    if (sortOrder && sortOrder !== "asc" && sortOrder !== "desc") {
      throw new Error("Sort order must be either 'asc' or 'desc'.");
    }

    if (location && location !== "string") {
      throw new Error("Location must be a valid string.");
    }
    if (category && category !== "string") {
      throw new Error("Category must be a valid string.");
    }

    const parsedQuery: IQueryPayload = {
      maxPrice: maxPrice ? Number(maxPrice) : 10000000,
      minPrice: minPrice ? Number(query.minPrice) : 1,
      page: page ? Number(query.page) : 1,
      limit: limit ? Number(limit) : 10,
      amenities: amenities as string[],
      sortBy: sortBy ? (sortBy as string) : "price",
      sortOrder: sortOrder ? (sortOrder as string) : "desc",
      category: category ? (category as string) : undefined,
      location: location ? (location as string) : undefined,
      search: search ? (search as string) : undefined,
    };

    const result = await propertyServices.getAllPropertiesFromDB(parsedQuery);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All properties retrived successfully!!",
      data: result,
    });
  },
);
const getPropertyDetailsById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.id;
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!propertyId) {
      throw new Error("Property id is required in params");
    }

    if (typeof propertyId !== "string" || !uuidRegex.test(propertyId)) {
      throw new Error(
        "Property id must be a string and should be given in a valid format",
      );
    }

    const propertyDetails =
      await propertyServices.getPropertyDetailsByIdFromDB(propertyId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Property details retrived successfully!!",
      data: propertyDetails,
    });
  },
);
export const propertyController = {
  getAllProperties,
  getPropertyDetailsById,
};
