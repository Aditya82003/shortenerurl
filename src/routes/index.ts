import express from "express";
import {handleShortenerUrlGenerator, handleUrlRedirect, handleUserLogin, handleUserSignUp} from "../controllers";

const router =express.Router()

router.post('/',handleShortenerUrlGenerator)
router.get('/:shortID',handleUrlRedirect)
router.post('/signup',handleUserSignUp)
router.post('/login',handleUserLogin)


export default router