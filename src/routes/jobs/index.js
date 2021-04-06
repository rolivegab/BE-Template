import { Router } from "express";
import { Op } from "sequelize";
import { Contract } from "../../models/Contract";
import { Job } from "../../models/Job";

export const jobsRoute = Router("/")
  .get("/unpaid", async (req, res) => {
    const { id: profileId } = req.profile;
    const contracts = await Contract.findAll({
      where: {
        status: "in_progress",
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      },
      include: {
        model: Job,
        where: {
          paid: false,
        },
      },
    });
    const jobs = contracts.flatMap((i) => i.Jobs);
    res.json(jobs);
  });
