import express from "express";
import cors from "cors";
import path from "path";
import documentRoutes from "./routes/documentRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// serve uploaded files statically (so downloads can be direct)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/documents", documentRoutes);

// error handler
app.use(errorHandler);

export default app;
