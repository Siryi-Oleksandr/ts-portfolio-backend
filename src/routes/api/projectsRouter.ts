import { getProjects } from "controllers/projectControllers";
import express from "express";
import { addProject } from "../../controllers/projectControllers";

const router = express.Router();

router.get("/", getProjects);
router.post("/", addProject);

export default router;
