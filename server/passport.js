import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import config from "config";
import { Users } from "./models/UserModel.js";
const { CLIENT_ID, CLIENT_SECRET } = config.get("google");

// app.use(passport.initialize());
// app.use(passport.session());

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
        console.log("profile: ", profile);
        let user = await Users.findOne({ where: { googleId: profile.id } });

        if (!user) {
          // Create new user if not exists
          user = {
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            role: config.get("role"),
          };
          // redirect to set user password
          return done(null, false, { user: user });
        }
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
