import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)

router.get("/profile", isAuthenticated, (req, res) => {
    res.status(200).json({
        status: 200,
        success: true,
        user: req.user
    })
})

export default router;
