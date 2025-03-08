import { Request, Response } from "express";
import shortid from "shortid";
import { URL, USERS } from "../models";
import bcrypt from "bcrypt"
// import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../services/auth";

//short url generator .......................................

export async function handleShortnerUrlGenerator(req: Request, res: Response) {
    try {
        const { url } = req.body
        if (!url) {
            res.status(400).json({ message: "url is required" })
            return
        }
        const shortID = shortid()

        await URL.create({
            shortID: shortID,
            redirectURL: url,
            visitHistory: []

        })
        res.status(200).json({ id: shortID })
    } catch {
        res.status(500).json({ message: "Something went wrong" })
    }
}

//handle short url redirect..............................................

export async function handleUrlRedirect(req: Request, res: Response) {
    try {
        const { shortID } = req.params
        if (!shortID) {
            res.status(404).json({ message: "Please enter valid short id in the url" })
            return
        }
        const urlData = await URL.findOneAndUpdate({ shortID }, { $push: { visitHistory: { timestamp: Date() } } })
        if (!urlData) {
            res.status(404).json({ message: "no such data found with that short id" })
            return
        }
        res.redirect(urlData.redirectURL)
    } catch (error) {
        res.status(500).json({ message: "Somethings went wrong" })
    }

}

// Handle user signUP.................................................................................

export async function handleUserSignUp(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await USERS.create({
            username,
            email,
            password: hashedPassword
        })
        if (!user) {
            res.status(400).json({ mesage: "unavailable to create user" })
            return
        }
        res.status(200).json({
            message: "User successfully created",
            username,
        })
    } catch (error) {
        res.status(500).json({ message: "Server errror", error: error })
    }
}


//Handle user Login.................................................................

export async function handleUserLogin(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const user = await USERS.findOne({ email })
        if (!user) {
            res.status(400).json({
                message: "Wrong Email ID or Paswaord"
            })
            return
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json({
                mesage: "Wrong Email ID or Paswaord"
            })
            return
        }

        // const sessionid = uuidv4();             //we send this id to the user in the cookies

        const token = await setUser(user)    //create a jwt token  with a combination of payload(mongoose object id-email ) and secret key
        
        console.log(token)
        res.cookie("uuid", token)

        res.status(200).json({
            Stauts: "OK",
            message: "Login Successfully",
            uuid:  token
        })
    } catch (error) {
        res.status(500).json({
            message: "Somethings went wrong in server",
            error: error
        })
    }
}