import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    name: {
      type: String,
      require: true,
      maxLength: 50,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
      index: 1,
      maxLength: 50,
      trim: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  { timeStamps: true }
);
export default mongoose.model("categories", categoriesSchema);
