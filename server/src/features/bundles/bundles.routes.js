import express from "express";
import { listBundles, getBundle } from "./bundles.controller.js";

const router = express.Router();

router.get("/", listBundles);
router.get("/:id", getBundle);

export default router;
