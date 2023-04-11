import express from "express";
import { v4 as uuidv4 } from "uuid";
import {
  insertAdminUser,
  updateOneAdminUser,
} from "../models/adminUserModel/AdminUserModel.js";
import { hashPassword } from "../helpers/bcryptHelper.js";
import {
  emailVerificationValidation,
  newAdminUserValidation,
} from "../middlewares/joivalidation/adminUserValidation.js";
import { verificationEmail } from "../helpers/emailHelper.js";
const router = express.Router();

router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);
    req.body.emailValidationCode = uuidv4();

    const user = await insertAdminUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message:
          "We have sent you an email to verify your account, please check your mail box including junk folder",
      });
      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;
      // send email
      verificationEmail({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        url,
      });
      return;
    } else {
      res.json({
        status: "error",
        message: "Unable to create new admin user, try again later",
      });
    }
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message =
        "There is already another user registered with the email you provided";
    }
    next(error);
  }
});
router.patch(
  "/verify-email",
  emailVerificationValidation,
  async (req, res, next) => {
    try {
      console.log(req.body);
      const { email, emailValidationCode } = req.body;
      const user = await updateOneAdminUser(
        {
          emailValidationCode,
          email,
        },
        {
          status: "active",
          emailValidationCode: "",
        }
      );
      user?._id
        ? res.json({
            status: "success",
            message: "Your account has been verified, you may login now",
          })
        : res.json({
            status: "error",
            message: "Invalid or expired link, no action was taken",
          });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
