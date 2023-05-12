import express from "express";
import { newPaymentMethodValidation } from "../middlewares/joi-validation/joiValidation.js";
const router = express.Router();
router.get("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to do get",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});
router.post("/",newPaymentMethodValidation, (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to do post",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});
export default router;