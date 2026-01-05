import "dotenv/config";
import express from "express";
import { prisma } from "../lib/prisma";
import authRoutes from "./routes/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/user", async (_req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

app.use("/api/v1/auth", authRoutes);

app.listen(3000, () => {
  console.log("🚀 Server ready at http://localhost:3000");
});
