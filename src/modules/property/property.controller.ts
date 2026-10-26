import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { propertyServices } from "./property.service";
import { sendResponse } from "../../utils/sendResponse";
import { IQueryPayload } from "./property.interface";

const getAllProperties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //     const query = req.query;
    //     const amenities = req.query.amenity;

    //     const { limit, maxPrice, minPrice, page, sortBy } = query;

    //     if (!limit || !maxPrice || !minPrice || !page) {
    //       throw new Error(
    //         "Limit, max price, min price and page are required in params.",
    //       );
    //     }

    //     if (
    //       Number.isNaN(minPrice) ||
    //       Number(minPrice) <= 0 ||
    //       minPrice >= maxPrice
    //     ) {
    //       throw new Error(
    //         "Min price must be a number which is greater than 0 and less than max price.",
    //       );
    //     }

    //     if (
    //       Number.isNaN(maxPrice) ||
    //       Number(maxPrice) <= 0 ||
    //       minPrice >= maxPrice
    //     ) {
    //       throw new Error(
    //         "Max price must be a number which is greater than 0 and min price.",
    //       );
    //     }

    //     if (Number.isNaN(page) || Number(page) < 1) {
    //       throw new Error("Page must be a number which is greater than 0.");
    //     }

    //     if (Number.isNaN(limit) || Number(limit) < 1) {
    //       throw new Error("Limit must be a number which is greater than 0.");
    //     }

    //     /* parsedQuery পাঠানোর আগে এগুলো validate করো:

    // minPrice, maxPrice — সংখ্যা হতে হবে, finite এবং >= 0; minPrice <= maxPrice। দুটোই required হলে !value দিয়ে check কোরো না—0-ও valid হতে পারে।
    // page, limit — positive integer হতে হবে (page >= 1, limit >= 1)।
    // amenities — amenity query থাকলে string বা string array—যেটাই API-তে অনুমোদিত—সেটাকে string-এর array হিসেবে নিশ্চিত করো। সরাসরি as string[] cast করলে validation হয় না।
    // sortBy — থাকলে অনুমোদিত মানের একটি: price, title, createdAt।
    // sortOrder — থাকলে শুধু asc বা desc; না থাকলে default desc।
    // category, location, search — থাকলে string হতে হবে; array/object যেন না আসে।
    // এই payload-এর field-গুলো property.interface.ts-এ আছে, আর validation-টা property.controller.ts-এ parsedQuery বানানোর আগে যোগ করতে হবে।

    // */

    //     const sortByEnums = ["price", "title", "createdAt"];

    //     if (sortBy && !sortByEnums.includes(String(sortBy))) {
    //       throw new Error("Sortby must be price or title or createdAt.");
    //     }

    //     const parsedQuery: IQueryPayload = {
    //       maxPrice: Number(query.maxPrice),
    //       minPrice: Number(query.minPrice),
    //       page: Number(query.page),
    //       limit: Number(query.limit),
    //       amenities: amenities as string[],
    //       sortBy: query.sortBy ? (query.sortBy as string) : "price",
    //       sortOrder: query.sortOrder ? (query.sortOrder as string) : "desc",
    //       category: query.category ? (query.category as string) : undefined,
    //       location: query.location ? (query.location as string) : undefined,
    //       search: query.search ? (query.search as string) : undefined,
    //     };

    //     const result = await propertyServices.getAllPropertiesFromDB(parsedQuery);

    const result = await propertyServices.getAllPropertiesFromDB();

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
