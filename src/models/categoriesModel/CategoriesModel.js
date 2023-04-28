import categoriesSchema from "./CategoriesSchema.js";
export const insertCategory = (obj) => {
  return categoriesSchema(obj).save();
};
