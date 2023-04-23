import express from "express";
import { v4 as uuidv4 } from "uuid";
import {
  findOneAdminUser,
  insertAdminUser,
  updateOneAdminUser,
} from "../models/adminUserModel/AdminUserModel.js";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import {
  emailVerificationValidation,
  loginValidation,
  newAdminUserValidation,
} from "../middlewares/joivalidation/adminUserValidation.js";
import {
  userVerifiedNotification,
  verificationEmail,
} from "../helpers/emailHelper.js";
import { createJWTs } from "../helpers/jwtHelpers.js";
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
          "We have sent you an email to verify your account, please check your email including the junk folder",
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
          }) && userVerifiedNotification(user)
        : res.json({
            status: "error",
            message: "Invalid or expired link, no action was taken",
          });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { password, email } = req.body;
    // find if admin user on the basis of given email
    const user = await findOneAdminUser({ email });
    // if we pass the registered email, we will get a user responded back
    if (user?._id) {
      if (user.status !== "active") {
        return res.json({
          status: "error",
          message:
            "Your account has not been verified, please check your email and verify your account",
        });
      }
      // We need to verify if the password sent by the user and the hashed password stored in our db is the same.
      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        user.password = undefined;
        // JWT
        const jwts = await createJWTs({ email });
        return res.json({
          status: "success",
          message: "logged in successfully",
          user,
          ...jwts,
        });
      }
    }
    res.json({
      status: "error",
      message: "invalid login credentials",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
