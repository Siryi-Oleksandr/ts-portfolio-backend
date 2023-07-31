import { Schema, Document, model } from "mongoose";
import { handleMongooseError } from "../helpers";

const emailRegexp: RegExp =
  /^([A-z0-9_-]+\.)*[A-z0-9_-]+@[A-z0-9_-]+(\.[A-z0-9_-]+)*\.[A-z]{2,6}$/;
const linkedinRegexp: RegExp =
  /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/;
const githubRegexp: RegExp =
  /^([A-Za-z0-9]+@|http(|s)\:\/\/)([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git)?$/i;
const telegramRegexp: RegExp =
  /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/;
const phoneRegexp: RegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

interface IUser extends Document {
  name: string;
  surname?: string;
  email: string;
  password: string;
  profession?: string;
  experience?: string;
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
      match: phoneRegexp,
      default: "",
    },

    telegram: {
      type: String,
      match: telegramRegexp,
      default: "",
    },

    linkedinURL: {
      type: String,
      match: linkedinRegexp,
      default: "",
    },

    gitHubURL: {
      type: String,
      match: githubRegexp,
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
      type: [String],
      default: [],
    },

    experience: {
      type: String,
      default: "",
    },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post<IUser>("save", handleMongooseError);

const UserModel = model<IUser>("user", userSchema);

export default UserModel;
