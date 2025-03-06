import { USERTOSESSION } from "../models";


export async function setUser(id: string, email: string) {
    await USERTOSESSION.create({
        sessionID: id,
        email
    })
}

export async function getUser(id: string) {
    const userEmail=await USERTOSESSION.findOne({sessionID:id})
    return userEmail
}


