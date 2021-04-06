import { Router } from "express";
import { contractsRoute } from "./contracts";

export const routes = Router("/").use("/contracts", contractsRoute);
