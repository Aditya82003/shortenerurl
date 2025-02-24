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
            shortID:shortID,
            redirectURL:url,
            visitHistory:[]

        })
        res.status(200).json({ id: shortID})
    } catch {
        res.status(500).json({ message: "Something went wrong" })
    }
}

export function handleUrlRedirect(req: Request, res: Response) {
    res.json({ message: "respose from the server" })

}