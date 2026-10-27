import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
const router = Router();

router.post("/create", auth(Role.TENANT), paymentController.createPayment);
router.post("/confirm", paymentController.confirmPayment);
router.get("/success", paymentController.successPayment);

router.get("/", auth(Role.TENANT), paymentController.getMyPayments);
router.get("/:id", auth(Role.TENANT), paymentController.getPaymentById);

export const paymentRoutes = router;
