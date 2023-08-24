import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
dotenv.config();
const PORT = process.env.PORT || 8001;
const app = express();
app.use("/api/user", userRouter);
app.listen(PORT, () => console.log(`started server at PORT: ${PORT}`));
