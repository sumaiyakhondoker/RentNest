import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoriesController } from "./category.controller";

const router = Router()

router.post('/',auth(Role.ADMIN), categoriesController.createCategory)
// router.get('/', )



export const categoryRoutes =  router