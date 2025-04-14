import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { create, readByEmail } from "../data/mongo/managers/users.manager.js";
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_ID, BASE_URL } = process.env

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
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))

passport.use("login", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            const one = await readByEmail(email)
            if (!one) {
                const error = new Error("INVALID CREDENTIALS")
                error.statusCode = 401
                return done(error)
            }
            const dbPassword = one.password
            const verify = verifyHashUtil(password, dbPassword)
            if (!verify) {
                const error = new Error("INVALID CREDENTIALS")
                error.statusCode = 401
                return done(error)
            }
            req.session.role = one.role
            req.session.user_id = one._id
            return done(null, one)
        } catch (error) {
            return done(done)
        }
    }
))

passport.use("google", new GoogleStrategy(
    { clientID: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_SECRET_ID, passReqToCallback: true, callbackURL: BASE_URL +"sessions/google/cb" },
   async (req, accessToken, refreshToken, profile, done) => {
        try {
            const { id, picture } = profile
            let user = await readByEmail(id)
            if(!user) {
                user = await create({ email: id, photo: picture, password: createHashUtil(id)}) 
            }
            req.session.role = user.role
            req.session.user_id = user._id
            return done(null, user)
            
        } catch (error) {
            done(error)
        }
    }
))

export default passport