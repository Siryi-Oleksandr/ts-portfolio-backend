import { Response, Request } from "express";
import fs from "fs/promises";
import {
  cloudinaryProjectAPI,
  controllerWrapper,
  HttpError,
  parseTechnicalStack,
} from "../helpers";
import ProjectModel from "../models/project";
import UserModel from "../models/user";
import { IProjectResponse } from "types/IProject";

// *******************  /projects  ******************

//* GET /projects/byQuery
const getProjects = controllerWrapper(async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    query,
  } = req.query as {
    page?: number;
    limit?: number;
    query?: string;
  };
  const skip = (page - 1) * limit;

  let projects: IProjectResponse[] = [];
  let totalCount: number = 0; // Initialize the total count to 0

  if (query) {
    // Get the  projects matching the query
    const queryRegex = new RegExp(query, "i"); //option "i" allows get result without matches register
    projects = await ProjectModel.find(
      {
        technicalStack: { $in: [queryRegex] },
      },
      "-createdAt -updatedAt"
    )
      .skip(skip)
      .limit(limit)
      .populate(
        "owner",
        "name surname email avatarURL profession phone telegram gitHubURL linkedinURL miniAvatarURL"
      );

    // Get the total count of projects matching the query
    totalCount = await ProjectModel.countDocuments({
      technicalStack: { $in: [queryRegex] },
    });
  } else {
    // Get the all  projects without query
    projects = await ProjectModel.find({}, "-createdAt -updatedAt")
      .skip(skip)
      .limit(limit)
      .populate(
        "owner",
        "name surname email avatarURL profession phone telegram gitHubURL linkedinURL miniAvatarURL"
      );

    // Get the total count of all projects
    totalCount = await ProjectModel.countDocuments({});
  }

  res.json({ projects, totalCount });
});

//* GET /projects/own
const getOwnProjects = controllerWrapper(async (req: any, res: Response) => {
  const { _id: owner } = req.user;
  const projects = await ProjectModel.find({ owner });

  res.json(projects);
});

//* GET /projects/own/:userId
const getProjectsByUserId = controllerWrapper(
  async (req: any, res: Response) => {
    const { userId: owner } = req.params;

    const user = await UserModel.findById(owner);
    if (!user) {
      throw new HttpError(404, `User not found`);
    }

    const projects = await ProjectModel.find({ owner });

    res.json(projects);
  }
);

//* POST /projects
const addProject = controllerWrapper(async (req: any, res: Response) => {
  const { _id: owner, subscription } = req.user;

  // Upload each poster to Cloudinary
  const uploadedPosters = await Promise.all(
    req.files.map(async (file: Express.Multer.File) => {
      await fs.access(file.path);
      let fileData;
      if (subscription === "vip") {
        fileData = await cloudinaryProjectAPI.uploadVIPPoster(file.path);
      } else {
        fileData = await cloudinaryProjectAPI.uploadPoster(file.path);
      }
      const posterURL = fileData?.url;
      const posterID = fileData?.public_id;

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

  if (!project) {
    throw new HttpError(404, `Project is not created`);
  }

  res.status(201).json(project);
});

//* PATCH /projects/:projectId
const updateProject = controllerWrapper(async (req: any, res: Response) => {
  const projectId = req.params.projectId;
  const { _id: owner, subscription } = req.user;

  // Find the project by ID and the owner's ID
  const projectToUpdate = await ProjectModel.findOne({ _id: projectId, owner });

  if (!projectToUpdate) {
    throw new HttpError(404, `Project not found`);
  }

  // Update the project properties based on the request body
  Object.assign(projectToUpdate, {
    ...req.body,
    technicalStack: parseTechnicalStack(req.body.technicalStack),
  });

  // Handle image updates if files are present in the request
  if (req.files && req.files.length > 0) {
    // delete previous posters
    projectToUpdate.projectImages.map(async (poster) => {
      await cloudinaryProjectAPI.delete(poster.posterID);
    });

    const updatedPosters = await Promise.all(
      req.files.map(async (file: Express.Multer.File) => {
        await fs.access(file.path);
        let fileData;
        if (subscription === "vip") {
          fileData = await cloudinaryProjectAPI.uploadVIPPoster(file.path);
        } else {
          fileData = await cloudinaryProjectAPI.uploadPoster(file.path);
        }
        const posterURL = fileData?.url;
        const posterID = fileData?.public_id;
        await fs.unlink(file.path);
        return { posterURL, posterID };
      })
    );

    // Update the project's image URLs and IDs
    projectToUpdate.projectImages = updatedPosters;
  }

  const updatedProject = await ProjectModel.findByIdAndUpdate(
    projectId,
    projectToUpdate,
    {
      new: true,
    }
  );

  res.json(updatedProject);
});

//* GET /projects/:projectId
const getProjectById = controllerWrapper(
  async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const project = await ProjectModel.findOne(
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

export {
  getProjects,
  getOwnProjects,
  addProject,
  getProjectById,
  removeProject,
  getProjectsByUserId,
  updateProject,
};
