import { Request, Response } from "express";

export function handlePostReq(req:Request,res:Response){

}

export function handleGetReq(req:Request,res:Response){
    res.json({message:"respose from the server"})

}