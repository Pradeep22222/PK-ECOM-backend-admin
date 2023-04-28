import express from "express";
import { insertCategory } from "../models/categoriesModel/CategoriesModel.js";
import { newCategoryValidation } from "../middlewares/joivalidation/joiValidation.js";
const router = express.Router();
// post new category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    const result = await insertCategory(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "category added",
        })
      : res.json({
          status: "success",
          message: "category added",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
