import { Schema, Document, model } from "mongoose";
import { handleMongooseError } from "../helpers/";

interface IProject extends Document {
  name: string;
  // codeURL: string;
  // livePageURL?: string;
  description?: string;
  // posterURL?: string | null;
  // posterID?: string | null;
  favorite: boolean;
  // owner: Schema.Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: [true, "Set name for project"],
    },
    // codeURL: {
    //   type: String,
    //   required: [true, "Set link to code current project"],
    // },
    // livePageURL: {
    //   type: String,
    // },
    description: {
      type: String,
      minlength: 30,
    },
    // posterURL: {
    //   type: String,
    //   default: null,
    // },
    // posterID: {
    //   type: String,
    //   default: null,
    // },
    favorite: {
      type: Boolean,
      default: false,
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: true }
);

projectSchema.post<IProject>("save", handleMongooseError);

const ProjectModel = model<IProject>("project", projectSchema);

export default ProjectModel;
