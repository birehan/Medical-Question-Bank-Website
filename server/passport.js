import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import config from "config";
const { CLIENT_ID, CLIENT_SECRET } = config.get("google");

import { Users } from "./models/UserModel.js";

passport.use(
  new Strategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await Users.findOne({ where: { email: profile.id } });
        // Create new user if not exists
        const response = await Users.upsert(
          {
            name: user?.name || profile?.displayName,
            email: user?.email || profile?.emails[0]?.value,
            googleId: profile.id,
            role: user?.role || config.get("role"),
          },
          {
            where: {
              email: profile?.emails[0]?.value,
            },
          }
        );
        user = response[0]?.dataValues;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
