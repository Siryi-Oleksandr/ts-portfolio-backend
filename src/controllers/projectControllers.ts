import { Response, Request } from "express";
import fs from "fs/promises";
import {
  cloudinaryProjectAPI,
  controllerWrapper,
  HttpError,
  parseTechnicalStack,
} from "../helpers";
import ProjectModel from "../models/project";

// *******************  /projects  ******************

//* GET /projects
const getProjects = controllerWrapper(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query as {
    page?: number;
    limit?: number;
  };
  const skip = (page - 1) * limit;
  const projects = await ProjectModel.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name surname email avatarURL");
  res.json(projects);
});

//* POST /projects
const addProject = controllerWrapper(async (req: any, res: Response) => {
  const { _id: owner } = req.user;

  // Upload each poster to Cloudinary
  const uploadedPosters = await Promise.all(
    req.files.map(async (file: Express.Multer.File) => {
      const fileData = await cloudinaryProjectAPI.upload(file.path);
      const posterURL = fileData.url;
      const posterID = fileData.public_id;
      await fs.unlink(file.path);
      return { posterURL, posterID };
    })
  );

  const project = await ProjectModel.create({
    ...req.body,
    owner,
    projectImages: [...uploadedPosters],
    technicalStack: parseTechnicalStack(req.body.technicalStack),
  });

  res.status(201).json(project);
});

//* GET /projects/:projectId
const getProjectById = controllerWrapper(
  async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const project = await ProjectModel.find(
      { _id: projectId },
      "-createdAt -updatedAt"
    ).populate("owner", "name surname email avatarURL");

    if (!project) {
      throw new HttpError(404, `Project with ${projectId} not found`);
    }
    res.json(project);
  }
);

//* DELETE /projects/:projectId
const removeProject = controllerWrapper(async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const removedProject = await ProjectModel.findByIdAndRemove(projectId);
  if (!removedProject) {
    throw new HttpError(404, `Project with ${projectId} not found`);
  }
  res.json({ message: "project deleted" });
});

export { getProjects, addProject, getProjectById, removeProject };
