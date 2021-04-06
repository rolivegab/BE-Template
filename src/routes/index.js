import { Router } from "express";
import { getProfile } from "../middleware/getProfile";
import { contractsRoute } from "./contracts";
import { jobsRoute } from "./jobs";

export const routes = Router("/")
  .use("/contracts", getProfile, contractsRoute)
  .use('/jobs', getProfile, jobsRoute);
