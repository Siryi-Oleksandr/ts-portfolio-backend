export interface IUserRegister {
  _id: string;
  name: string;
  email: string;
  password: string;
  proffesion: string;
  experience: number;
  phone: string;
  telegram: string;
  summary: string;
  technicalStack: string[];
  avatarURL: string;
  avatarID: string;
  refreshToken: string;
  accessToken: string;
}

export interface IUserModel {
  name: string;
  email: string;
  password: string;
  proffesion: string;
  experience: number;
  phone?: string;
  telegram?: string;
  summary: string;
  technicalStack?: string[];
  avatarURL?: string;
  avatarID?: string;
  refreshToken: string;
  accessToken: string;
}

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  phone: string;
  telegram: string;
  linkedinURL: string;
  gitHubURL: string;
  summary: string;
  avatarURL: string;
  profession: string;
  technicalStack: string;
  experience: string;
}
