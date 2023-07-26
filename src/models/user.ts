import { Schema, Document, model } from "mongoose";
import { handleMongooseError } from "../helpers";

const emailRegexp: RegExp =
  /^([A-z0-9_-]+\.)*[A-z0-9_-]+@[A-z0-9_-]+(\.[A-z0-9_-]+)*\.[A-z]{2,6}$/;

interface IUser extends Document {
  name: string;
  surname?: string;
  email: string;
  password: string;
  profession?: string;
  experience?: number;
  phone?: string;
  telegram?: string;
  summary?: string;
  technicalStack?: string[];
  avatarURL?: string;
  avatarID?: string;
  linkedinURL?: string;
  gitHubURL?: string;
  refreshToken: string;
  accessToken: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 35,
      required: [true, "Set name for account"],
    },
    surname: {
      type: String,
      minlength: 2,
      maxlength: 35,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },

    phone: {
      type: String,
      default: "",
    },

    telegram: {
      type: String,
      default: "",
    },

    linkedinURL: {
      type: String,
      default: "",
    },

    gitHubURL: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },

    refreshToken: {
      type: String,
      default: "",
    },

    accessToken: {
      type: String,
      default: "",
    },

    avatarURL: {
      type: String,
      default: "",
    },

    avatarID: {
      type: String,
      default: "",
    },

    profession: {
      type: String,
      default: "",
    },

    technicalStack: {
      type: Array<string>,
      default: [],
    },

    experience: {
      type: Number,
      default: null,
    },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post<IUser>("save", handleMongooseError);

const UserModel = model<IUser>("user", userSchema);

export default UserModel;
