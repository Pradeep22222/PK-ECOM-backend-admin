import express from "express";
const router = express.Router();
// post new category
router.post("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "category added",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
