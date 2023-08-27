import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import errorHandler from "./middleware/errorMiddleware";

dotenv.config();
const PORT: number | string = process.env.PORT || 8001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log(`started server at PORT: ${PORT}`));
