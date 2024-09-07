"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRouter = void 0;
const express_1 = require("express");
const jwtUtils_1 = require("../utils/jwtUtils");
const customerRouter = (customerController) => {
    const router = (0, express_1.Router)();
    router.get("/", jwtUtils_1.verifyToken, customerController.getAllCustomers);
    router.get("/:customerId", jwtUtils_1.verifyToken, customerController.getCustomerById);
    router.post("/", jwtUtils_1.verifyToken, customerController.createCustomer);
    router.put("/:customerId", jwtUtils_1.verifyToken, customerController.updateCustomer);
    router.delete("/:customerId", jwtUtils_1.verifyToken, customerController.deleteCustomer);
    return router;
};
exports.customerRouter = customerRouter;
