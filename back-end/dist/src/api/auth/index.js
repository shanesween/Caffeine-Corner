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
const express_1 = __importDefault(require("express"));
const router = express_1.default();
const { User } = require('../../db/models');
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ where: { email: req.body.email } });
        if (!user) {
            console.log('No such user found:', req.body.email);
            res.status(401).send('Wrong username and/or password');
        }
        else if (!user.correctPassword(req.body.password)) {
            console.log('Incorrect password for user:', req.body.email);
            res.status(401).send('Wrong username and/or password');
        }
        else {
            req.login(user, err => (err ? next(err) : res.json(user)));
        }
    }
    catch (err) {
        next(err);
    }
}));
router.post('/signup', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.create(req.body);
        // console.log("USER", user);
        // console.log("request", req.body)
        req.login(user, err => (err ? next(err) : res.json(user)));
    }
    catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(401).send('User already exists');
        }
        else {
            next(err);
        }
    }
}));
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        req.logout();
        res.redirect('/');
    });
});
router.get('/me', (req, res) => {
    res.json(req.user);
});
router.use('/google', require('./google'));
exports.default = router;
