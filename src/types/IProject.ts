import { Schema } from "mongoose";

export interface IPoster {
  posterURL: string;
  posterID: string;
}

export interface IProjectModel {
  projectTitle: string;
  projectSubTitle?: string;
  projectLink: string;
  codeLink?: string;
  projectImages: IPoster[];
  aboutProject: string;
  technicalStack: string;
  owner: Schema.Types.ObjectId;
}
