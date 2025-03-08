import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const secretKey = process.env.JWT_SECRET_KEY as string

type SetUserProp = {
    _id: mongoose.Types.ObjectId,
    email: string,
    password: string
}

//it generate jwt token or barrier token with the help of user object

export async function setUser(user: SetUserProp) {
    return jwt.sign({
        id: user._id,
        email: user.email
    }, secretKey)
}

//It verify the giving token that it is valid or not ..................

export function getUser(token: string) {
    console.log(process.env)
    if (!token) return null
    try {
        return jwt.verify(token, secretKey)
    } catch (error) {
        return null
    }
}

// import { USERTOSESSION } from "../models";


// export async function setUser(id: string, email: string) {
//     await USERTOSESSION.create({
//         sessionID: id,
//         email
//     })
// }

// export async function getUser(id: string) {
//     const userEmail=await USERTOSESSION.findOne({sessionID:id})
//     return userEmail
// }


