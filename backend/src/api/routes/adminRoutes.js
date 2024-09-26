import express from "express";
import adminLogin from "../module/auth/admin/loginController.js";
import refreshAccessToken from '../module/auth/token/refreshAccessToken.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminLogout from "../module/auth/admin/logoutController.js";

const router = express.Router();

router.post('/auth/token/refresh',  authMiddleware('admin'), refreshAccessToken)

//admin login and logout
router.post("/login", adminLogin);
router.post("/logout", authMiddleware('admin'),  adminLogout);

export default router;


