import express from "express";
import {handleShortenerUrlGenerator, handleUrlRedirect, handleUserLogin, handleUserSignUp} from "../controllers";
import { restrictToLoggedInUserOnly } from "../middlewares/auth";

const router =express.Router()

router.get('/:shortID',handleUrlRedirect)
router.post('/',restrictToLoggedInUserOnly,handleShortenerUrlGenerator)
router.post('/signup',handleUserSignUp)
router.post('/login',handleUserLogin)


export default router