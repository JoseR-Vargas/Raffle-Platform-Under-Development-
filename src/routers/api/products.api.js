import { Router } from "express"
import { create, destroy, read, update } from "../../data/mongo/managers/products.manager.js";

const productsApiRouter = Router();


productsApiRouter.get("/", async (req, res, next) => {
    try {
        const message = "PRODUCT FOUND"
        const response = await read()
        return res.status(200).json({ response, message })

    } catch (error) {
        return next(error);

    }
})

export default productsApiRouter;


productsApiRouter.post("/", async (req, res, next) => {
    try {
        const message = "PRODUCTS CREATED"
        const data = req.body
        const response = await create(data)
        return res.status(201).json({ response, message })
    } catch (error) {
        return next(error)
    }
});

productsApiRouter.put("/:id", async (req, res, next) => {
    try {
        const message = "PRODUCT UPDATED";
        const { id } = req.params; // Obtener el ID desde la URL
        const data = req.body; // Obtener los nuevos datos desde el body
        const response = await update(id, data);
        return res.status(200).json({ response, message })
    } catch (error) {
        next(error)
    }
});

productsApiRouter.delete("/:id", async (req, res, next) => {
    try {
        const message = "PRODUCT DELETED";
        const { id } = req.params;
        const response = await destroy(id)
        return res.status(200).json({response, message});
    } catch (error) {
        return next(error)
    }
})