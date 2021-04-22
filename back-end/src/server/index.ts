import path from "path"
import express from "express"
import db from "../db"
import cors from "cors"
import session from "express-session"
import morgan from "morgan"
import passport from "passport"
import connect from "connect-session-sequelize"

const app = express()
const PORT = process.env.PORT || 8080
const SequelizeStore = connect(session.Store)
const sessionStore = new SequelizeStore({ db });


const createApp = () => {
  // -->CORS Access<--
  app.use(cors())

  // session middleware
  app.use(
    session({
      secret: "secrets",
      store: sessionStore,
      resave: false,
      saveUninitialized: true,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // TODO: Add passport functionality

  // passport.serializeUser((user, done) => {
  //   try {
  //     done(null, user.id);
  //   } catch (err) {
  //     done(err);
  //   }
  // });

  // passport.deserializeUser((id, done) => {
  //   User.findById(id)
  //     .then(user => done(null, user))
  //     .catch(done);
  // });


  // -->Logging middleware morgan https://github.com/expressjs/morgan  <--//
  app.use(morgan("dev"))

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // -->Serving javascript files, css files, and images from public folder<--//
  // https://expressjs.com/en/starter/static-files.html

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, ".", "public")))

  // API routes are prefixed with /api/ -
  // this is purely done to namespace
  //  them away from your "front-end routes" (such as those created by react-router).
  app.use("/api", require("../api")) // matches all requests to /api

  app.get("*", function (req, res, next) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
  })

}

// -->Starting server<-- //
const startServer = () => {
  try {

    app.listen(process.env.PORT || PORT, () =>
      console.log(`Listening on ${PORT}`),
    )
  } catch (err) {
    console.error(`Error occured: ${err}`)
  }
}

const syncDb = () => db.sync()

const bootApp = async () => {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startServer()
}

bootApp()
