import "dotenv/config";
import config from "./configs";
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import logger from "./utils/logger"
import { connect } from "./utils/database.connection"
import { googleAuth } from './configs/google.auth'
import { routesInit } from "./api/routes/index"



const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.use(
    session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            expires: new Date(Date.now() + 10000),
            maxAge: 10000,
        }
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res, next) => {
    res.send("<a href='http://localhost:8090/auth/google'>Login with google</a>");
    next();
})

app.listen(PORT, () => {

    logger.info(`Server is up and  running on P O R T ${PORT}`);
    connect();
    routesInit(app, passport);
    googleAuth(passport);

})



