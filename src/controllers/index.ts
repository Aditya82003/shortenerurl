import { Request, Response } from "express";
import shortid from "shortid";
import URL from "../models";

export async function handleShortenerUrlGenerator(req: Request, res: Response) {
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

export async function handleUrlRedirect(req: Request, res: Response) {
    try {
        const { shortID } = req.params
        if (!shortID) {
            res.status(404).json({ message: "Please enter valid short id in the url" })
            return
        }
        const urlData = await URL.findOneAndUpdate({ shortID }, { $push: { visitHistory: {timestamp:Date.now()} } })
        if (!urlData) {
            res.status(404).json({ message: "no such data found with that short id" })
            return
        }
        res.redirect(urlData.redirectURL)
    } catch (error) {
        res.status(500).json({ message: "Somethings went wrong" })
    }

}