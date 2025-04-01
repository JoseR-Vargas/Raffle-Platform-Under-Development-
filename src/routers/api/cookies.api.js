import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.post("/create", (req, res, next) => {
    try {
        const message = "COOKIE SETEADA"
        return res.status(200).cookie("modo", "oscuro").json({ message })
    } catch (error) {
        return next(error)
    }
});

cookiesRouter.get("/read", (req, res, next) => {
    try {
        const cookies = req.cookies
        console.log(cookies);
        const message = "COOKIE LEIDA"
        return res.status(200).json({ message })
    } catch (error) {
        return next(error)
    }
});

cookiesRouter.delete("/destroy", (req, res, next) => {
    try {

        const message = "COOKIE DESTROYED"
        return res
            .status(200)
            .clearCookie("modo")
            .json({ message })
    } catch (error) {
        return next(error)
    }
})

export default cookiesRouter;