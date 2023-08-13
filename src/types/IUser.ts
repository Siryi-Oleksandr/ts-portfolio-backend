export interface IUserResponse {
  _id: string;
  name: string;
  surname: string;
  email: string;
  profession: string;
  experience: string;
  phone: string;
  telegram: string;
  linkedinURL: string;
  gitHubURL: string;
  summary: string;
  technicalStack: [string];
  avatarURL: string;
  miniAvatarURL: string;
  subscription: Subscription;
}

type Subscription = "start" | "pro";

// export interface IUserRegister {
//   _id: string;
//   name: string;
//   surname?: string;
//   email: string;
//   password: string;
//   profession?: string;
//   experience?: string;
//   phone?: string;
//   telegram?: string;
//   summary?: string;
//   technicalStack?: [string];
//   avatarURL?: string;
//   avatarID?: string;
//   miniAvatarURL?: string;
//   linkedinURL?: string;
//   gitHubURL?: string;
//   refreshToken: string;
//   accessToken: string;
// }

// export interface IUserModel {
//   name: string;
//   surname?: string;
//   email: string;
//   password: string;
//   profession?: string;
//   experience?: string;
//   phone?: string;
//   telegram?: string;
//   summary?: string;
//   technicalStack?: [string];
//   avatarURL?: string;
//   avatarID?: string;
//   miniAvatarURL?: string;
//   linkedinURL?: string;
//   gitHubURL?: string;
//   refreshToken: string;
//   accessToken: string;
// }
