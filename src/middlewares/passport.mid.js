import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { create, readByEmail } from "../data/mongo/managers/users.manager.js";
import { createHashUtil } from "../utils/hash.util.js";

passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            if (!email || !password) {
                // passport responde por defecto
            }

            const one = await readByEmail(email)
            if (one) {
                const error = new Error("USER ALREADY EXIST")
                error.statusCode = 400
                return done(error)
            }

            req.body.password = createHashUtil(password)
            const data = req.body
            const user = await create(data)
            return done (null, user)
        } catch (error) {
            return done (error)
        }
    }
))
// passport.use("login", new LocalStrategy())

export default passport