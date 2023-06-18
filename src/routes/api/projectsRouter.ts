import { getProjects, addProject } from "../../controllers/projectControllers";
import express from "express";

const router = express.Router();

router.get("/", getProjects);
router.post("/", addProject);

export default router;
