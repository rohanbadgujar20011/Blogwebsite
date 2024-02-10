const express = require("express");
const {
  verifytoken,
  getSingle,
  getAllUser,
  signUp,
  logIn,
} = require("../controller/user-contoller");
const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.get("/getsingleuser/:id", getSingle);
userRouter.post("/tokenIsValid", verifytoken);

module.exports = userRouter;
