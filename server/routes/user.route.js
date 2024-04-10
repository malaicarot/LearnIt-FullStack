import express from "express";
import { UserController } from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.middleware.js";
import { uploader } from "../middleware/uploader.middleware.js";

const UserRouter = express.Router();

UserRouter.get("/", verifyToken, UserController.checkLoginState);

// UserRouter.get("/", verifyToken, UserController.getAll);

UserRouter.post("/register", UserController.register);

UserRouter.post("/login", UserController.login);

UserRouter.post("/upload", verifyToken, uploader.single("file"), UserController.upload)

export { UserRouter };
