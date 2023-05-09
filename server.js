import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import express from "express";
const app = express();
const PORT = 8000;
// db connection
import { dbConnection } from "./src/config/dbConfig.js";
dbConnection();
// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
// apis
import adminUserRouter from "./src/routers/adminUserRouter.js";
app.use("/api/v1/admin-user", adminUserRouter);
import categoriesRouter from "./src/routers/categoriesRouter.js";
import { adminAuth } from "./src/middlewares/auth-middleware/authMiddleware.js";
import paymentRouter from "./src/routers/paymentMethodsRouter.js";

app.use("/api/v1/categories",adminAuth, categoriesRouter);
app.use("/api/v1/payment", adminAuth, paymentRouter);
app.use("/", (req, res) => {
  res.json({
    message: "are you lost darling",
  });
});
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.status || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server running on http://localhost:${PORT}`);
});
