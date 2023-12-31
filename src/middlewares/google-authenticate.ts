import passport from "passport";
import { Strategy, VerifyCallback } from "passport-google-oauth2";
import { Request } from "express";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

const {
  GOOGLE_CLIENT_ID = "",
  GOOGLE_CLIENT_SECRET = "",
  BASE_RENDER_URL,
} = process.env;

const googleParams: {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  passReqToCallback: true;
} = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_RENDER_URL}/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  _req: Request,
  _accessToken: string,
  _refreshToken: string,
  profile: any,
  done: VerifyCallback
) => {
  try {
    const { email, displayName } = profile;

    const user = await UserModel.findOne({ email });

    if (user) {
      done(null, user); // login with google + (res.user = user)
      return;
    }

    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await UserModel.create({
      email,
      password,
      name: displayName,
    });

    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

export default passport;
