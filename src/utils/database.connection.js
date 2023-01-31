import mongoose from "mongoose";
import config from "../configs";
import logger from "./logger";

let database;

const connect = async () => {

  const MONGODB_URL = config.DB_CONNECTION_STRING;

  if (database) return;

  mongoose.set('strictQuery', true);

  mongoose
    .connect("mongodb+srv://chalanis:eD3vHHTwX8xydp5Q@library-db-cluster.psdcotd.mongodb.net/?retryWrites=true&w=majority")
    .then((connection) => {
      database = connection;
      logger.info("Database Synced");
    })
    .catch((err) => {
      logger.error(err.message);
    });
};

export { connect };