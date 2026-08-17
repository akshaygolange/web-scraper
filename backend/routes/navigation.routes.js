import express from "express";
import { getNavigation } from "../controllers/navigation.controller.js";

const router = express.Router();

router.get("/", getNavigation);

export default router;