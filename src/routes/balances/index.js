import { Router } from "express";
import { Op, Transaction } from "sequelize";
import { Contract } from "../../models/Contract";
import { Job } from "../../models/Job";
import { sequelize } from "../../service/sequelize";

export const balancesRoute = Router("/").post(
  "/deposit/:userId",
  async (req, res) => {
    const amount = Number(req.body.amount);
    const profile = req.profile;
    await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (transaction) => {
        const priceSum = await Job.sum("price", {
          paid: false,
          include: {
            model: Contract,
            where: {
              [Op.or]: { ClientId: profile.id },
              status: "in_progress",
            },
            required: true,
          },
          transaction,
        });
        const maxDeposit = priceSum * 0.25;
        if (amount > maxDeposit) {
          return res.status(400).send("max deposit amount is " + maxDeposit.toFixed(2));
        }

        profile.balance = (profile.balance ?? 0) + amount;
        await profile.save({transaction})
        res.json(profile);
      }
    );
  }
);
