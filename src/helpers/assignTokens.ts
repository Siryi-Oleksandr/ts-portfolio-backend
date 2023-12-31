import jwt from "jsonwebtoken";

const {
  ACCESS_TOKEN_SECRET_KEY = "",
  REFRESH_TOKEN_SECRET_KEY = "",
  RESET_TOKEN_SECRET_KEY = "",
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  RESET_TOKEN_EXPIRES_IN,
} = process.env;

interface IUser {
  _id: string;
  name: string;
  email: string;
}

interface IPayload {
  userId: string;
  userName: string;
  userEmail: string;
}

export const assignTokens = (user: IUser) => {
  const payload: IPayload = {
    userId: user._id,
    userName: user.name,
    userEmail: user.email,
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
  const resetToken = jwt.sign(payload, RESET_TOKEN_SECRET_KEY, {
    expiresIn: RESET_TOKEN_EXPIRES_IN,
  });

  return { accessToken, refreshToken, resetToken };
};
