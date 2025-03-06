import mongoose, { Mongoose, Schema } from "mongoose";


const urlSchema = new Schema({
    shortID: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [{ timestamp: { type: Date } }]

}, { timestamps: true })

export const URL = mongoose.model("url", urlSchema)

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const USERS = mongoose.model("users", userSchema)


const userToSessionIDSchema = new Schema({
    sessionID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

export const USERTOSESSION = mongoose.model("usertosessionsid", userToSessionIDSchema) 