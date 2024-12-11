const DbConnection = require("./DbConnection");
const mysql = require("mysql");
const AccountModel = require("../../Models/AccountModel");

let DbAccounts = {
  register,
  getAccountByEmployeeEmail,
};
module.exports = DbAccounts;

async function register(userModel) {
  let sql =
    "INSERT INTO accounts (email, password, first_name, last_name) VALUES (?, ?, ?, ?);";
  let inserts = [
    userModel.Email,
    userModel.HashedPassword,
    userModel.FirstName,
    userModel.LastName,
  ];
  let query = mysql.format(sql, inserts);
  return await DbConnection.runQuery(query);
}

async function getAccountByEmployeeEmail(email) {
  let sql = `SELECT employees.email, accounts.*
    FROM accounts 
    LEFT JOIN employees 
    ON employees.employee_id = accounts.employee_id
    WHERE employees.email LIKE ?;`;
  let inserts = ["%" + email + "%"];
  let query = mysql.format(sql, inserts);
  let singleResultArr = await DbConnection.runQuery(query);

  let account = null;
  if (singleResultArr.length === 1) {
    account = new AccountModel();
    account.Email = singleResultArr[0].email;
    account.AccountId = singleResultArr[0].account_id;
    account.EmployeeId = singleResultArr[0].employee_id;
    account.HashedPassword = singleResultArr[0].password;
    account.IsActive = singleResultArr[0].is_active;
    account.DateUpdated = singleResultArr[0].date_updated;
  }
  return account;
}
