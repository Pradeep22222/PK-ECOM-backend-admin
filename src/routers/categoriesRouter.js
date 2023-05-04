import express from "express";
import slugify from "slugify";
import {
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCategoryById,
} from "../models/categoriesModel/CategoriesModel.js";
import { newCategoryValidation, updateCategoryValidation } from "../middlewares/joivalidation/joiValidation.js";
const router = express.Router();
// get categories
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const categories = _id
      ? await getCategoryById(_id)
      : await getAllCategories();
    res.json({
      status: "success",
      message: "category list",
      categories,
    });
  } catch (error) {
    next(error);
  }
});
// post new category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name, {
      lower: true,
      trim: true,
    });
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

// update category
router.put("/",  async (req, res, next) => {
  try {
    const catUpdate= await updateCategoryById(req.body)
    console.log(req.body);
    catUpdate?._id
      ? res.json({
          status: "success",
          message: "the category has been updated",
        })
      : res.json({
          status: "error",
          message: "Unable to update the category, please try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
