const fsPromise = require('fs/promises');
const fs = require('fs');
const readlinePromise = require('readline/promises')
const path = require('path');

let jsonAccounts = {
    register,
    getAccountByEmail
}

module.exports = jsonAccounts

async function register(userModel) {

    const userObj = {
        email: userModel.Email,
        first_name: userModel.FirstName,
        last_name: userModel.LastName,
        password: userModel.HashedPassword,
        picture: "DSC_0017.JPG"
    }

    return fsPromise.appendFile(path.join(__dirname + '/accounts.txt'), JSON.stringify(userObj) + '\n')
}

async function getAccountByEmail(email) {
    const readStream = fs.createReadStream(path.join(__dirname + '/accounts.txt'));
    const rlp = readlinePromise.createInterface({ input: readStream, crlfDelay: Infinity });

    let user;
    for await (const line of rlp) {
        const userObj = JSON.parse(line);
        if (userObj.email === email) {
            user = userObj
        }
    }
    return user;
}