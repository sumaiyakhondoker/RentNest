import { Router } from "express";
import { propertyController } from "./property.controller";

const router = Router()

router.get('/', propertyController.getAllProperties)
router.get('/:id', propertyController.getPropertyDetailsById)

export const propertyRoutes = router

