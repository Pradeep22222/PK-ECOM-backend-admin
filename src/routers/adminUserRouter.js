import express from "express";
import { insertAdminUser } from "../models/adminUserModel/AdminUserModel.js";
import { hashPassword } from "../helpers/bcryptHelper.js";
const router = express.Router();
// server side validation

// encrypt user password

// insert into the db

// create unique verification code

// send create a link pointing to our frontend with the email and verification code and send to their email
router.post("/", async (req, res, next) => {
  try {
    const { password } = req.body;
     req.body.password = hashPassword(password);

    const user = await insertAdminUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message:
            "We have sent you an email to verify your account, please check your mail box including junk folder",
        })
      : res.json({
          status: "error",
          message: "Unable to create new admin user, try again later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message = "There is already another user registered with the email you provided"
      
    }
      next(error);
  }
});
router.patch("/verify-email", (req, res, next) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "verify email to create new user",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
