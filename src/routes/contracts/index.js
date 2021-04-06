import { Router } from "express";
import { Op } from "sequelize";
import { Contract } from "../../models/Contract";

export const contractsRoute = Router("/")
  .get("/:contractId", async (req, res) => {
    const { contractId } = req.params;
    const { id: profileId } = req.profile;
    const contract = await Contract.findOne({
      where: {
        id: contractId,
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      },
    });
    if (!contract) return res.status(404).end();
    res.json(contract);
  })
  .get("/", async (req, res) => {
    const { id: profileId } = req.profile;
    const contracts = await Contract.findAll({
      where: {
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      },
    });
    res.json(contracts);
  });
