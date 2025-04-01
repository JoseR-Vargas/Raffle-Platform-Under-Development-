import { model, Schema } from "mongoose";

const collection = "products";

const schema = new Schema ({
    title: { type: String, required: true, index: true },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 },
    category: { type: String, enum: ["Category1", "category2", "category2"], default: "category1"}
});

const Products = model(collection, schema);

export default Products;