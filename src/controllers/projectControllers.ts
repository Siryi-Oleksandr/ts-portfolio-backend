import { Response, Request } from "express";
import { controllerWrapper, HttpError } from "../helpers";
import ProjectModel from "../models/project";

// *******************  /api/projects  ******************

//* GET /projects
const getProjects = controllerWrapper(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query as {
    page?: number;
    limit?: number;
    favorite?: boolean;
  };
  const skip = (page - 1) * limit;
  const projects = await ProjectModel.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(projects);
});

//* POST /projects
const addProject = controllerWrapper(async (req: Request, res: Response) => {
  //   const { _id: owner } = req.user;
  //   const { path: tempUpload } = req.file;

  //   const fileData = await cloudinaryAPI.upload(tempUpload);
  //   await fs.unlink(tempUpload);

  const project = await ProjectModel.create({
    ...req.body,
    // owner,
    // posterURL: fileData.url,
    // posterID: fileData.public_id,
  });

  res.status(201).json(project);
});

//* GET /projects/:projectId
const getProjectById = controllerWrapper(
  async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const project = await ProjectModel.findById(projectId);
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
