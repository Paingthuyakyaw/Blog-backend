import "dotenv/config";
import express from "express";
import { prisma } from "../lib/prisma";
import authRoutes from "./routes/auth";
import { NextFunction, Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/user", async (_req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

app.use("/api/v1/auth", authRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error to the console (or log service)
  res.status(500).json({
    message: "Something went wrong on the server.",
    error: err.message,
  });
});

app.listen(3000, () => {
  console.log("🚀 Server ready at http://localhost:3000");
});
