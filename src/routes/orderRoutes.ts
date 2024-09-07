import { Router } from "express";
import { OrderController } from "../handlers/controllers/controllers";
import { verifyToken } from '../utils/jwtUtils';

export const orderRouter = (orderController: OrderController) => {
  const router = Router();

  router.get("/", verifyToken, orderController.getAllOrders);
  router.get("/:orderId", verifyToken, orderController.getOrderById);
  router.post("/", verifyToken, orderController.createOrder);
  router.put("/:orderId", verifyToken, orderController.updateOrder);
  router.delete("/:orderId", verifyToken, orderController.deleteOrder);

  return router;
};