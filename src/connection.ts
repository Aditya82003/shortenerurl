import mongoose from "mongoose";

async function mongoDBConnection(url: string) {
    return mongoose.connect(url)
}

export default mongoDBConnection