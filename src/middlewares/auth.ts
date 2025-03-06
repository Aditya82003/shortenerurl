import express, { Request, Response, NextFunction } from "express";
import { USERTOSESSION } from "../models";
export async function restrictToLoggedInUserOnly(req: Request, res: Response, next: NextFunction) {
    try {
        const { uuid } = req.cookies
        if (!uuid) {
            res.status(400).json({ message: "PLease Login" })
            return
        }
        const userEmail = await USERTOSESSION.findOne({ sessionID: uuid })
        if(!userEmail){
            res.status(400).json({mesage:"PLease login"})
            res.redirect('/shortener/login')
        }
        next()
    } catch (error) {
        res.status(500).json({ message: "server error", error: error })
    }

}