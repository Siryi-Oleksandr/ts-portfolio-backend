import express from "express";
import {
  getProjects,
  addProject,
  getProjectById,
  removeProject,
} from "../controllers/projectControllers";
import { isValidId, isValidBody, auth, upload } from "../middlewares";
import { joiAPI } from "../schemes/JoiAPI";

const router = express.Router();

router.get("/", getProjects);
router.get("/:projectId", isValidId, getProjectById);
router.post(
  "/",
  auth,
  upload.array("posters", 5),
  isValidBody(joiAPI.projectSchema),
  addProject
);
router.delete("/:projectId", isValidId, removeProject);

export default router;
