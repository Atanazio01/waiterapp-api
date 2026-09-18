import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import { router } from "./router";
import { dirnameFrom } from './utils/dirname';

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    const app = express();
    const PORT = 3001;

    const __dirname = dirnameFrom(import.meta.url);

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads")),
    );

    app.use(express.json());
    app.use(router);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("❌ Error connecting to MongoDB", error));
