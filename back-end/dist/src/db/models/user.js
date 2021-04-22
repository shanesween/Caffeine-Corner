"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const crypto_1 = __importDefault(require("crypto"));
const Sequelize = __importStar(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const User = db_1.default.define("user", {
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        // Making `.password` act like a func hides it when serializing to JSON.
        // This is a hack to get around Sequelize's lack of a "private" option.
        get() {
            return () => this.getDataValue("password");
        }
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    address: {
        type: Sequelize.STRING
    },
    // dont not need logged in field because of the loggednin route.
    salt: {
        type: Sequelize.STRING,
        // Making `.salt` act like a function hides it when serializing to JSON.
        // This is a hack to get around Sequelize's lack of a "private" option.
        get() {
            return () => this.getDataValue("salt");
        }
    },
    googleId: {
        type: Sequelize.STRING
    }
});
/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
    return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};
/**
 * classMethods
 */
User.generateSalt = function () {
    return crypto_1.default.randomBytes(16).toString("base64");
};
User.encryptPassword = function (plainText, salt) {
    return crypto_1.default
        .createHash("RSA-SHA256")
        .update(plainText)
        .update(salt)
        .digest("hex");
};
/**
 * hooks
 */
const setSaltAndPassword = user => {
    if (user.changed("password")) {
        user.salt = User.generateSalt();
        user.password = User.encryptPassword(user.password(), user.salt());
    }
};
User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
    users.forEach(setSaltAndPassword);
});
exports.default = User;
