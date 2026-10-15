import { Router } from "express";
import { rentalRequestController } from "./rentalRequest.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.post('/',auth(Role.TENANT),rentalRequestController.createRentalRequest)
router.get('/',auth(Role.TENANT), rentalRequestController.getAllRentalRequest)
router.get('/:id',auth(Role.TENANT), rentalRequestController.getRentalRequestById)

export const rentalRequestRoutes = router

