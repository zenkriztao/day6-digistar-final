"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const jwtUtils_1 = require("../utils/jwtUtils");
const orderRouter = (orderController) => {
    const router = (0, express_1.Router)();
    router.get("/", jwtUtils_1.verifyToken, orderController.getAllOrders);
    router.get("/:orderId", jwtUtils_1.verifyToken, orderController.getOrderById);
    router.post("/", jwtUtils_1.verifyToken, orderController.createOrder);
    router.put("/:orderId", jwtUtils_1.verifyToken, orderController.updateOrder);
    router.delete("/:orderId", jwtUtils_1.verifyToken, orderController.deleteOrder);
    return router;
};
exports.orderRouter = orderRouter;
