import { Response } from "express";

// *******************  /api/projects  ******************

const getProjects = async (_req: any, res: Response) => {
  res.json("projects 🥥");
};

export { getProjects };
