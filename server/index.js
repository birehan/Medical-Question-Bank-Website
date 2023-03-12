import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import CourseRoute from "./routes/CourseRoute.js";
import QuestionSetsRoute from "./routes/QuestionSetRoute.js";
import { Users } from "./models/UserModel.js";
import config from "config";
import argon2 from "argon2";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
const { CLIENT_ID, CLIENT_SECRET } = config.get("google");
import bodyParser from "body-parser";

import cookieSession from "cookie-session";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const __basedir = __dirname;

const app = express();

const sessionStore = SequelizeStore(session.Store);
// const store = new sessionStore({ db: db });
const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESS_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
(async () => {
  await db.sync();
  try {
    const hashPassword = await argon2.hash("password");
    await Users.upsert({
      name: "birehan",
      email: "birehan@gmail.com",
      password: hashPassword,
      role: "admin",
    });
  } catch (error) {
    console.log(error);
  }
})();

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["cyberwolve"],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

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
            name: user?.name || profile.displayName,
            email: user?.email || profile.emails[0].value,
            googleId: profile.id,
            role: user?.role || config.get("role"),
          },
          {
            where: {
              email: profile.emails[0].value,
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

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(CourseRoute);
app.use(QuestionSetsRoute);
app.use("/uploads", express.static("./uploads"));

// app.use("/uploads", express.static("uploads"));

store.sync();
const port = config.get("port") || 8080;

app.listen(port, () => {
  console.log(`Server up and running...on ${port}`);
});
