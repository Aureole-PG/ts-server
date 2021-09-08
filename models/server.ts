import express, { Application } from "express";
import userRoutes from "../routes/users";
import { dbConection } from "../db/connection";
import authRoutes from "../routes/auth";
import cors from "cors";
class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: "/api/users",
    auth: "/api/auth",
  };
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.middleWares();
    this.routers();
    this.conection();
  }

  routers() {
    this.app.use(this.apiPaths.users, userRoutes);
    this.app.use(this.apiPaths.auth, authRoutes);
  }
  async conection() {
    await dbConection();
  }
  middleWares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("server is runnig in port " + this.port);
    });
  }
}

export default Server;
