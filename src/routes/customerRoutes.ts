import { Router } from "express";
import { CustomerController } from "../handlers/controllers/controllers";
import { verifyToken } from '../utils/jwtUtils';

export const customerRouter = (customerController: CustomerController) => {
  const router = Router();

  router.get("/", verifyToken, customerController.getAllCustomers);
  router.get("/:customerId", verifyToken, customerController.getCustomerById);
  router.post("/", verifyToken, customerController.createCustomer);
  router.put("/:customerId", verifyToken, customerController.updateCustomer);
  router.delete("/:customerId", verifyToken, customerController.deleteCustomer);

  return router;
};