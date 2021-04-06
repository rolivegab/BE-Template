import { Router } from "express";
import { Op, Transaction } from "sequelize";
import { Contract } from "../../models/Contract";
import { Profile } from "../../models/Profile";
import { Job } from "../../models/Job";
import { sequelize } from "../../service/sequelize";

export const adminRoute = Router("/")
  .get("/best-profession", async (req, res) => {
    const start = new Date(req.query.start);
    const end = new Date(req.query.end);
    const jobsByProfession = await Job.findAll({
      attributes: [
        "id",
        [sequelize.fn("sum", sequelize.col("balance")), "amount"],
      ],
      group: ["Contract->Contractor.profession"],
      where: {
        paymentDate: {
          [Op.gte]: start.toISOString(),
          [Op.lt]: end.toISOString(),
        },
      },
      limit: 1,
      include: {
        model: Contract,
        include: {
          model: Profile,
          foreignKey: "ContractorId",
          as: "Contractor",
        },
      },
      order: [[sequelize.col("amount"), "desc"]],
    });
    res.json(
      jobsByProfession?.[0]?.Contract?.Contractor?.profession ?? false
    );
  });
