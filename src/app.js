import express from "express";
import { routes } from "./routes";
import { doAssociations } from "./service/doAssociations";

doAssociations();
export const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use("/", routes);
