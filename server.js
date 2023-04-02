import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import express from "express";
const app = express();
const PORT = 8000;
// middlewares
app.use(cors());
app.use(helmet());
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
 