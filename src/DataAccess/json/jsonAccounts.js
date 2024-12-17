const fsPromise = require('fs/promises');
const fs = require('fs');
const readlinePromise = require('readline/promises')
const path = require('path');
const UserModel = require("../../Models/UserModel");


let jsonAccounts = {
    register,
    getAccountByEmail
}

module.exports = jsonAccounts

const accountFilePath = path.join(__dirname + '/accounts.txt');

async function register(userModel) {

    const userObj = {
        email: userModel.Email,
        first_name: userModel.FirstName,
        last_name: userModel.LastName,
        password: userModel.HashedPassword,
        picture: userModel.Picture
    }

    return fsPromise.appendFile(accountFilePath, JSON.stringify(userObj) + '\n')
}

async function getAccountByEmail(email) {
    try {
        await fsPromise.access(accountFilePath)
    } catch (error) {
        console.log("file does not exist")
        await fsPromise.appendFile(accountFilePath, '')
    }
    const readStream = fs.createReadStream(accountFilePath);
    const rlp = readlinePromise.createInterface({ input: readStream, crlfDelay: Infinity });

    let user;

    for await (const line of rlp) {
        const userObj = JSON.parse(line);

        if (userObj.email === email) {
            user = new UserModel();
            user.Email = userObj.email;
            user.FirstName = userObj.first_name;
            user.LastName = userObj.last_name;
            user.Picture = userObj.picture;
            user.HashedPassword = userObj.password;
        }
    }
    return user;
}