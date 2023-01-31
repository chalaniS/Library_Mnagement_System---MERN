import mongoose from "mongoose";
import config from "../configs";
import logger from "./logger";

let database;

const connects = async() =>{
   connects
    const MONGODB_URL = config.DB_CONNECTION_STRING;  
    
    if(database) return;    
    logger.info("Database ");
    mongoose
        .connect(MONGODB_URL)
        .then((connection) => {
          database = connection;
          logger.info("Database Synced");
        })
        .catch((err) => {
              logger.error(err.message);
        });
};

export {connects};