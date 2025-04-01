import { model, Schema } from "mongoose"

const collection = "users"

const schema = new Schema({
    name: { type: String },
    email: { type:String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN", "PREMIUN"] },
    verifyUSer:{ type: Boolean, default: false },
    verifyCode: { type: String, default:"1234" }
});

const User = model( collection, schema )
export default User;