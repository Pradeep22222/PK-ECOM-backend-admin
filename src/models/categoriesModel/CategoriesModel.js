import categoriesSchema from "./CategoriesSchema.js";
// post categories
export const insertCategory = (obj) => {
  return categoriesSchema(obj).save();
};
// get one category
export const getCategoryById = (_id) => {
  return categoriesSchema.findById(_id);
};
// get all categories
export const getAllCategories = () => {
  return categoriesSchema.find();
};
// update category
export const updateCategoryById = ({ _id, ...update }) => {
  return categoriesSchema.findByIdAndUpdate(_id, update, { new: true });
};
// update category
export const hasChildCategoryById = async (_id) => {
  const cat = await categoriesSchema.findOne({ parentId:_id });
  return cat?._id ? true : false;
};
