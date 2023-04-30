import express from "express";
import slugify from "slugify";
import { insertCategory } from "../models/categoriesModel/CategoriesModel.js";
import { newCategoryValidation } from "../middlewares/joivalidation/joiValidation.js";
const router = express.Router();
// post new category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name, {
      lower: true,
      trim:true,
    })
    const result = await insertCategory(req.body);

    console.log(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "category added",
        })
      : res.json({
          status: "error",
          message: "category couldn't be added",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
