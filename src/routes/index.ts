import express from "express";
import { handleGetReq, handlePostReq} from "../controllers";

const router =express.Router()

// router.post('/',handlePostReq)
router.get('/',handleGetReq)

export default router