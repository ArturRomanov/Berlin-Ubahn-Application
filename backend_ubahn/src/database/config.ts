import { Sequelize } from "sequelize-typescript";
import { Routes } from "../models/routes";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "routes",
  logging: false,
  models: [Routes],
});

export default connection;
