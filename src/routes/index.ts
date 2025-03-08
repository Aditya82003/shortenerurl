import express from "express";
import {handleShortnerUrlGenerator, handleUrlRedirect, handleUserLogin, handleUserSignUp} from "../controllers";
import { restrictToLoggedInUserOnly } from "../middlewares/auth";

const router =express.Router()

router.get('/:shortID',handleUrlRedirect)
router.post('/',restrictToLoggedInUserOnly,handleShortnerUrlGenerator)
router.post('/signup',handleUserSignUp)
router.post('/login',handleUserLogin)


export default router