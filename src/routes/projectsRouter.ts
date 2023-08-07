import express from "express";
import {
  getProjects,
  getOwnProjects,
  addProject,
  getProjectById,
  getProjectsByUserId,
  removeProject,
  updateProject,
} from "../controllers/projectControllers";
import { isValidId, isValidBody, auth, upload } from "../middlewares";
import { joiAPI } from "../schemes/JoiAPI";

const router = express.Router();

router.get("/", getProjects);
router.get("/own", auth, getOwnProjects);
router.get("/own/:userId", isValidId("userId"), getProjectsByUserId);
router.get("/:projectId", isValidId("projectId"), getProjectById);
router.post(
  "/",
  auth,
  upload.array("posters", 3),
  isValidBody(joiAPI.projectSchema),
  addProject
);
router.patch(
  "/:projectId",
  auth,
  upload.array("posters", 3),
  isValidBody(joiAPI.projectSchema),
  updateProject
);
router.delete("/:projectId", isValidId("projectId"), removeProject);

export default router;
