import "dotenv/config.js"
import express from "express"
import morgan from "morgan"
import patHandler from "./src/middlewares/pathHandler.mid.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import indexRouter from "./src/routers/index.router.js"
import dbConnect from "./src/utils/dbConnect.utils.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"

const server = express();
const port = process.env.PORT
const ready = () => {
    console.log(`Server ready ON PORT ${port}`);
    dbConnect();
};

server.listen(port, ready);


// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
// cookies
server.use(cookieParser(process.env.SECRET_KEY));
// configuracion de session
server.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: process.env.MONGO_LINK, TTL: 1000})
}));

// Routes
server.use(indexRouter);
server.use(errorHandler);
server.use(patHandler);