import { Router } from "express";
import { getProfile } from "../middleware/getProfile";
import { adminRoute } from "./admin";
import { balancesRoute } from "./balances";
import { contractsRoute } from "./contracts";
import { jobsRoute } from "./jobs";

export const routes = Router("/")
  .use(getProfile)
  .use("/contracts", contractsRoute)
  .use('/jobs', jobsRoute)
  .use('/balances', balancesRoute)
  .use('/admin', adminRoute);
