import "dotenv/config";
import express from "express";
import { prisma } from "../lib/prisma";

const app = express();

app.use(express.json());

app.get("/user", async (_req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

app.listen(3000, () => {
  console.log("🚀 Server ready at http://localhost:3000");
});
