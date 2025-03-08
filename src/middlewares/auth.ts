import express, { Request, Response, NextFunction } from "express";
// import { USERTOSESSION } from "../models";
import { getUser } from "../services/auth";
import { JwtPayload } from "jsonwebtoken";

export async function restrictToLoggedInUserOnly(req: Request, res: Response, next: NextFunction) {
    try {
        const { uuid } = req.cookies
        if (!uuid) {
            res.status(400).json({
                message: "PLease Login"
            })
            return
        }

        // const userEmail = await USERTOSESSION.findOne({ sessionID: uuid })
        // if(!userEmail){
        //     res.status(400).json({mesage:"PLease login"})
        //     res.redirect('/shortener/login')
        // }

        const userPayload   = getUser(uuid)      //it check whether the giving token is valid or not
        if (!userPayload) {
            res.status(400).redirect("/shortener/login")
            return
        }

        req.user = userPayload as JwtPayload       // req.user contain the payload whic contain email-id mongoose object-id......
        next()
    } catch (error) {
        res.status(500).json({ message: "server error", error: error })
    }

}