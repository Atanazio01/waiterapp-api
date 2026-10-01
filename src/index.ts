import express from "express";
import mongoose from "mongoose";
import http from "node:http";
import path from "node:path";
import { Server } from "socket.io";
import { cors } from "./middlewares/cors";
import { router } from "./router";
import { dirnameFrom } from "./utils/dirname";

const app = express();
const server = http.createServer(app);
export const io = new Server();
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    const PORT = 3001;

    io.attach(server);

    io.on("connection", (socket) => {
      console.log("A user connected");
    });

    const __dirname = dirnameFrom(import.meta.url);

    app.use(cors);
    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads")),
    );

    app.use(express.json());
    app.use(router);

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("❌ Error connecting to MongoDB", error));
