import Product from "../models/products.model.js";
import Manager from "./manager.js";

const productsManager = new Manager(Product)
const { create, read, readById, readByEmail, update, destroy } = productsManager

export { create, read, readById, readByEmail, update, destroy }