import { Router } from "express";
import { rentalRequestController } from "./rentalRequest.controller";

const router = Router()

router.post('/', rentalRequestController.createRentalRequest)
router.get('/', rentalRequestController.getAllRentalRequest)
router.get('/:id', rentalRequestController.getRentalRequestById)


export const rentalRequestRoutes = router

