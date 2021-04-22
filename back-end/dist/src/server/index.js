"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const app = express_1.default();
const PORT = process.env.PORT || 8080;
const SequelizeStore = connect_session_sequelize_1.default(express_session_1.default.Store);
const sessionStore = new SequelizeStore({ db: db_1.default });
const createApp = () => {
    // -->CORS Access<--
    app.use(cors_1.default());
    // session middleware
    app.use(express_session_1.default({
        secret: "secrets",
        store: sessionStore,
        resave: false,
        saveUninitialized: true,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
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
    app.use(morgan_1.default("dev"));
    // body parsing middleware
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // -->Serving javascript files, css files, and images from public folder<--//
    // https://expressjs.com/en/starter/static-files.html
    // static file-serving middleware
    app.use(express_1.default.static(path_1.default.join(__dirname, ".", "public")));
    // API routes are prefixed with /api/ -
    // this is purely done to namespace
    //  them away from your "front-end routes" (such as those created by react-router).
    app.use("/api", require("../api")); // matches all requests to /api
    app.get("*", function (req, res, next) {
        res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
    });
};
// -->Starting server<-- //
const startServer = () => {
    try {
        app.listen(process.env.PORT || PORT, () => console.log(`Listening on ${PORT}`));
    }
    catch (err) {
        console.error(`Error occured: ${err}`);
    }
};
const syncDb = () => db_1.default.sync();
const bootApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sessionStore.sync();
    yield syncDb();
    yield createApp();
    yield startServer();
});
bootApp();
