import Sequelize from "sequelize";
import { sequelize } from "../service/sequelize";

export class Contract extends Sequelize.Model {}
Contract.init(
  {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("new", "in_progress", "terminated"),
    },
  },
  {
    sequelize,
    modelName: "Contract",
  }
);
