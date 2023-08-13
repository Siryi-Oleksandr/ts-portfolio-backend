import { Schema, Document, model } from "mongoose";
import { handleMongooseError } from "../helpers";

const emailRegexp: RegExp =
  /^([A-z0-9_-]+\.)*[A-z0-9_-]+@[A-z0-9_-]+(\.[A-z0-9_-]+)*\.[A-z]{2,6}$/;
const linkedinRegexp: RegExp =
  /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/;
const githubRegexp: RegExp =
  /^(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z\d-]+$/i;
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
  technicalStack?: [string];
  avatarURL?: string;
  avatarID?: string;
  miniAvatarURL?: string;
  linkedinURL?: string;
  gitHubURL?: string;
  subscription?: Subscription;
  refreshToken: string;
  accessToken: string;
  resetPasswordToken: string;
}

type Subscription = "start" | "pro";

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
      default: "",
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

    subscription: {
      type: String,
      default: "start",
    },

    refreshToken: {
      type: String,
      default: "",
    },

    accessToken: {
      type: String,
      default: "",
    },

    resetPasswordToken: {
      type: String,
      default: "",
    },

    avatarURL: {
      type: String,
      default:
        "https://res.cloudinary.com/dsjxdktiz/image/upload/v1690985797/avatars/nbewgn0cyuvs6rpjbqow.png",
    },

    miniAvatarURL: {
      type: String,
      default:
        "https://res.cloudinary.com/dsjxdktiz/image/upload/v1690985797/avatars/nbewgn0cyuvs6rpjbqow.png",
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
