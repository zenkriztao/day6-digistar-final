"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const jwtUtils_1 = require("../utils/jwtUtils");
const validators_1 = require("../handlers/validators/validators");
const userRouter = (userController) => {
    const router = (0, express_1.Router)();
    router.get("/", jwtUtils_1.verifyToken, userController.getAllUsers); // Protected by JWT
    router.get("/:userId", jwtUtils_1.verifyToken, validators_1.getUserValidator, userController.getUserById); // Protected by JWT
    router.post("/", validators_1.createUserValidator, userController.createUser); // No authentication needed
    router.put("/:userId", jwtUtils_1.verifyToken, validators_1.updateUserValidator, userController.updateUser); // Protected by JWT
    router.delete("/:userId", jwtUtils_1.verifyToken, validators_1.deleteUserValidator, userController.deleteUser); // Protected by JWT
    router.post("/register", userController.register); // Public route
    router.post("/login", userController.login); // Public route
    return router;
};
exports.userRouter = userRouter;
