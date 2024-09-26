import express from "express";
import signin from "../module/auth/user/signinController.js";


const router = express.Router();

//customer authentication
router.post('/signin', signin);
// router.post('/logout', customerLogout);


export default router;