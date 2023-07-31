import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/";
import { IProjectModel } from "../types/IProject";

const projectSchema = new Schema<IProjectModel>(
  {
    projectTitle: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: [true, "Set title for project"],
    },
    projectSubTitle: {
      type: String,
      minlength: 3,
      maxlength: 100,
    },
    projectLink: {
      type: String,
      required: [true, "Set link to project live page"],
    },
    codeLink: {
      type: String,
    },
    projectImages: {
      type: [Object],
      required: [true, "add at least one poster to the project"],
    },
    aboutProject: {
      type: String,
      required: [true, "Set description about the project"],
    },
    // technicalStack: {
    //   type: [String],
    //   required: [true, "add at least one technical to the project"],
    // }, // TODO temporary
    technicalStack: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

projectSchema.post<IProjectModel>("save", handleMongooseError);

const ProjectModel = model<IProjectModel>("project", projectSchema);

export default ProjectModel;
