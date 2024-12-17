const bcrypt = require("bcrypt");
const responses = require("../Helpers/responsesHelper");
const CredentialsModel = require("../Models/CredentialsModel");
const UserModel = require("../Models/UserModel");
const DbAccounts = require("../DataAccess/Database/DbAccounts");
const jsonAccounts = require('../DataAccess/json/jsonAccounts')
const jwtHelper = require("../Helpers/jwtHelper");

let UserRoutes = { login, logout, register, getUserByEmail };
module.exports = UserRoutes;

let saltRounds = 10;

async function register(req, res, next) {
    let user = new UserModel();
    user.Email = req.body.email;
    user.UnhashedPassword = req.body.password;
    user.FirstName = req.body.firstname;
    user.LastName = req.body.lastname;
    user.Picture = req.body.email === "vincentflores88@gmail.com" ? "DSC_0017.JPG" : "puppy.jpg"

    try {
        // let account = await DbAccounts.getAccountByEmployeeEmail(user.Email);
        let account = await jsonAccounts.getAccountByEmail(user.Email);
        if (account) {
            res.status(409).json({
                ...responses.conflictResponseBuilder("User already exists"),
            });
            return;
        }
        user.HashedPassword = await bcrypt.hash(user.UnhashedPassword, saltRounds);
        await jsonAccounts.register(user)
        // await DbAccounts.register(user);
        res.status(201).json({
            ...responses.createdBuilder("User Added"),
        });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    let invalidCredsMessage = "Invalid username or password";
    let base64Encoding = req.headers.authorization.split(" ")[1];
    let credentials = Buffer.from(base64Encoding, "base64").toString().split(":");
    let creds = new CredentialsModel();
    creds.Email = credentials[0];
    creds.UnhashedPassword = credentials[1];

    if (!creds.Email || !creds.UnhashedPassword) {
        res.status(401).json({
            ...responses.unathorizedResponseBuilder(invalidCredsMessage),
        });
        return;
    }

    let user;
    try {
        user = await jsonAccounts.getAccountByEmail(creds.Email);
        //   user = await DbAccounts.getAccountByEmail(creds.Email)
    } catch (error) {
        next(error);
    }

    if (!user) {
        res.status(401).json({
            ...responses.unathorizedResponseBuilder(invalidCredsMessage),
        });
    } else {
        let isMatch = await bcrypt.compare(
            creds.UnhashedPassword,
            user.HashedPassword
        );
        if (!isMatch) {
            res.status(401).json({
                ...responses.unathorizedResponseBuilder(invalidCredsMessage),
            });
        } else {
            let token = await jwtHelper.generateToken(null, user.Email);
            res.set({
                "Access-Control-Expose-Headers": "*",
                "Access-Control-Allow-Headers": "*",
            });
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({
                user: { ...user },
                ...responses.OkResponseBuilder("OK"),
            });
        }
    }

    //   let token = await jwtHelper.generateToken(null, creds.Email);
    //   res.set({
    //     "Access-Control-Expose-Headers": "*",
    //     "Access-Control-Allow-Headers": "*",
    //   });
    //   res.cookie("token", token, { httpOnly: true });
    //   res.status(200).json({
    //     user: {...user},
    //     ...responses.OkResponseBuilder("OK"),
    //   });
}

async function logout(req, res, next) {
    res.clearCookie("token");
    res.status(200).json({
        ...responses.OkResponseBuilder("Cookies cleared"),
    });
}

async function getUserByEmail(req, res, next) {
    try {
        const email = req.params.email
        const user = await DbAccounts.getAccountByEmail(email)
        res.status(200).json({
            user: { ...user },
            ...responses.OkResponseBuilder("Ok")
        })
    } catch (error) {
        next(error);
    }

}
