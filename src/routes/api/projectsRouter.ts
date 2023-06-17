import { getProjects } from "controllers/projectControllers";
import express from "express";

const router = express.Router();

router.get("/", getProjects);

export default router;
