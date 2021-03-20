const path = require("path")
const express = require("express")
const app = express()
const db = require("../db")
const cors = require("cors")
const PORT = process.env.PORT || 8080
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const sessionStore = new SequelizeStore({ db });
const morgan = require("morgan")
const bodyParser = require("body-parser")
const passport = require("passport");





const createApp = () => {
  // -->CORS Access<--
  app.use(cors())

  // -->Body parser <--//
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  )

  // session middleware with 
  app.use(
    session({
      secret: "my best friend is Cody",
      store: sessionStore,
      resave: false,
      saveUninitialized: true,
      userId: undefined
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    try {
      done(null, user.id);
    } catch (err) {
      done(err);
    }
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(done);
  });

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
  app.use(function (err, req, res, next) {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || "Internal server error.")
  })
}

// -->Starting server<-- //
const startServer = () => {
  app.listen(process.env.PORT || PORT, () =>
    console.log(`Listening on ${PORT}`),
  )
}

const syncDb = () => db.sync()

const bootApp = async () => {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startServer()
}

bootApp()
