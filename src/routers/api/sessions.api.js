import { Router } from "express";
import { readByEmail, readById } from "../../data/mongo/managers/users.manager.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import verifyHash from "../../middlewares/verifyHash.mid.js";
import passport from "../../middlewares/passport.mid.js"
import { verifyTokenUtil } from "../../utils/token.util.js";




const sessionsRouter = Router();

sessionsRouter.post("/register", passport.authenticate("register", {session: false}), register );
sessionsRouter.post("/login", passport.authenticate("login", {session: false}), login );
sessionsRouter.post("/signout", signout );
sessionsRouter.post("/online", onlineToken );
sessionsRouter.get("/google", passport.authenticate("google", { scope:[ "email", "profile" ]}));
sessionsRouter.get("/google/cb", passport.authenticate("google", { session: false }), google);

export default sessionsRouter;

async function register (req, res, next) {
    try {
        const user = req.user
        return res.status(201).json({ message: "USER REGISTERED", user_id: user._id})
    } catch (error) {
        return next(error)
    }
}

async function login (req, res, next)  {
    try {
        return res.status(200).json({ message: " USER LOGGED IN", token: req.token })
    } catch (error) {
        return next(error)
    }
}

async function signout (req, res, next) {
    try {
        req.session.destroy()
        return res.status(201).json({  message: "USER SIGNED OUT" })
    } catch (error) {
       return next (error)
    }
}

async function online (req, res, next) {
    try {
        const { user_id } = req.session
        const one = await readById(user_id)
        if (req.session.user_id) {
            return res.status(200).json({message: one.email.toUpperCase() + " IS ONLINE", online: true})
        } else {
            return res.status(400).json({message: "USER IS NOT ONLINE", online: false})
        }
    } catch (error) {
        return next(error)
    }
}

function google (req, res, next) {
    try {
        const user = req.user
        return res.status(200).json({ message: " USER LOGGED IN", token: req.token })
    } catch (error) {
        return next(error)
    }
}  

async function onlineToken (req, res, next) {
     try {
        const { token } = req.headers
        const data  = verifyTokenUtil(token)
        const one = await readById(data.user_id)
        if (one) {
            return res.status(200).json({message: one.email.toUpperCase() + " IS ONLINE", online: true})
        } else {
            return res.status(400).json({message: "USER IS NOT ONLINE", online: false})
        }
     } catch (error) {
        return next(error)
     }
}