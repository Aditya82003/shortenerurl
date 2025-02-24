import express from "express";
import {handleShortenerUrlGenerator, handleUrlRedirect} from "../controllers";

const router =express.Router()

router.post('/',handleShortenerUrlGenerator)
router.get('/:shortID',handleUrlRedirect)


export default router