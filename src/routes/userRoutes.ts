import { Router } from "express";
import { UserController } from "../handlers/controllers/controllers";
import { verifyToken } from '../utils/jwtUtils';
import {
  createUserValidator,
  updateUserValidator,
  getUserValidator,
  deleteUserValidator,
} from "../handlers/validators/validators";

export const userRouter = (userController: UserController) => {
  const router = Router();

  router.get("/", verifyToken, userController.getAllUsers); // Protected by JWT
  router.get("/:userId", verifyToken,getUserValidator, userController.getUserById); // Protected by JWT
  router.post("/", createUserValidator, userController.createUser); // No authentication needed
  router.put("/:userId", verifyToken, updateUserValidator, userController.updateUser); // Protected by JWT
  router.delete("/:userId", verifyToken, deleteUserValidator, userController.deleteUser); // Protected by JWT

  router.post("/register", userController.register); // Public route
  router.post("/login", userController.login); // Public route

  return router;
};
