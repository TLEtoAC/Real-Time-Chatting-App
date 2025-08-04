import socketsetup from "../controller/socket.js";
import express from "express";

const router = express.Router();
router.get("/", socketsetup);
export default router;