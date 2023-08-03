import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers";

type Props = "userId" | "projectId";

const isValidId = (idType: Props) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const id = idType === "userId" ? req.params.userId : req.params.projectId;
    if (!isValidObjectId(id)) {
      next(new HttpError(400, `${id} is not a valid id`));
    }
    next();
  };
};

export default isValidId;

// const isValidId = (req: Request, _res: Response, next: NextFunction) => {
//   const { projectId } = req.params;
//   if (!isValidObjectId(projectId)) {
//     next(new HttpError(400, `${projectId} is not valid id`));
//   }
//   next();
// };
