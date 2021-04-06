import { Router } from "express";
import { Op } from "sequelize";
import { getProfile } from "../../middleware/getProfile";
import { Contract } from "../../models/Contract";

export const contractsRoute = Router("/")
  .get("/:id", getProfile, async (req, res) => {
    const { id } = req.params;
    const { id: profileId } = req.profile;
    const contract = await Contract.findOne({
      where: {
        id,
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      },
    });
    if (!contract) return res.status(404).end();
    res.json(contract);
  })
  .get("/", getProfile, async (req, res) => {
    const { id: profileId } = req.profile;
    const contracts = await Contract.findAll({
      where: {
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      },
    });
    res.json(contracts);
  });
