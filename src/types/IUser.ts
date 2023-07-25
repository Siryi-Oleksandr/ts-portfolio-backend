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
