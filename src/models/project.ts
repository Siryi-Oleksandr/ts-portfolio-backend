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
      maxlength: 200,
      default: "",
    },
    projectLink: {
      type: String,
      default: "",
    },
    codeLink: {
      type: String,
      default: "",
    },
    projectImages: {
      type: [Object],
      required: [true, "projectImages is required"],
    },
    aboutProject: {
      type: String,
      required: [true, "aboutProject is required"],
    },
    technicalStack: {
      type: [String],
      required: [true, "technicalStack is required"],
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
