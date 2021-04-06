import { Router } from "express";
import { Op, Transaction } from "sequelize";
import { Contract } from "../../models/Contract";
import { Job } from "../../models/Job";
import { sequelize } from "../../service/sequelize";

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
  })
  .post("/:jobId/pay", async (req, res) => {
    const { jobId } = req.params;
    const profile = req.profile;
    const job = await Job.findOne({
      id: jobId,
      paid: false,
      include: {
        model: Contract,
        where: {
          ClientId: profile.id,
          status: "in_progress",
        },
        required: true,
      },
    });
    await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (transaction) => {
        if (profile.balance >= job.price) {
          const paidJob = await Job.update(
            {
              paid: true,
            },
            {
              where: {
                id: jobId,
              },
              transaction,
            }
          );
          profile.balance = profile.balance - job.price;
          await profile.save({ transaction });

          res.json(true);
        } else {
          res.status(400).send("insufficient_balance");
        }
      }
    );
  });
