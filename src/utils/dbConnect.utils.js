import { connect } from "mongoose";

async function dbConnect () {
    try {
        connect(process.env.MONGO_LINK);
        console.log("MongoDb Connected");
        
    } catch (error) {
        console.log(error);
        
    }
};

export default dbConnect; 