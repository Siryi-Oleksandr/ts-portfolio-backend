import express from "express";
import {
  getProjects,
  getOwnProjects,
  addProject,
  getProjectById,
  removeProject,
} from "../controllers/projectControllers";
import { isValidId, isValidBody, auth, upload } from "../middlewares";
import { joiAPI } from "../schemes/JoiAPI";

const router = express.Router();

router.get("/", getProjects);
router.get("/own", auth, getOwnProjects);
router.get("/:projectId", isValidId, getProjectById);
router.post(
  "/",
  auth,
  upload.array("posters", 4),
  isValidBody(joiAPI.projectSchema),
  addProject
);
router.delete("/:projectId", isValidId, removeProject);

export default router;
