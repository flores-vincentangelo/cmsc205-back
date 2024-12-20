require("dotenv").config({ path: "./env/variables.env" });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const errorHelper = require("./Helpers/errorHelper");
// const jwtHelper = require("./Helpers/jwtHelper");

const UserRoutes = require("./Routes/UserRoutes");
const MarkerRoutes = require("./Routes/MarkerRoutes");

let app = express();
app.use(cors());

let router = express.Router();
app.use(express.json());
app.use(cookieParser());

router.post("/register", UserRoutes.register);
router.post("/login", UserRoutes.login);
router.post("/register", UserRoutes.register);
// router.get("/logout", UserRoutes.logout);

router.get("/user/:email", UserRoutes.getUserByEmail)
router.get("/markers", MarkerRoutes.getMarkers)

// router.get(
// 	"/employee-details",
// 	jwtHelper.verifyToken,
// 	EmployeeRoutes.getDetails
// );

// reimbursement endpoints
// router.post(
// 	"/file-reimbursement",
// 	jwtHelper.verifyToken,
// 	ReimbursementRoutes.file
// );
// router.get(
// 	"/get-reimbursement-items",
// 	jwtHelper.verifyToken,
// 	ReimbursementRoutes.getLatestDraftReimbItems
// );

// update status deleted
// router.delete(
// 	"/remove-reimbursement-item",
// 	jwtHelper.verifyToken,
// 	ReimbursementRoutes.deleteDraftReimbItem
// );
// router.get(
// 	"/submit-transaction",
// 	jwtHelper.verifyToken,
// 	ReimbursementRoutes.submitTransaction
// );

// router.post(
// 	"/print-transaction",
// 	jwtHelper.verifyToken,
// 	ReimbursementRoutes.printTransaction
// );

// flexpoints
// router.get(
// 	"/calculate-flex-points",
// 	jwtHelper.verifyToken,
// 	FlexPointsRoutes.calculateFlexPoints
// );

// hr endpoints\
// must see all transaction except draft
// router.get(
// 	"/reimbursement-by-cutoff",
// 	jwtHelper.verifyToken,
// 	HrRoutes.getReimbTransByCutoff
// );
// router.get(
// 	"/reimbursement-details",
// 	jwtHelper.verifyToken,
// 	HrRoutes.getReimbTransItems
// );
// router.get(
// 	"/search-reimbursement",
// 	jwtHelper.verifyToken,
// 	HrRoutes.searchReimbTransaction
// );
// router.post(
// 	"/approve-reimbursement",
// 	jwtHelper.verifyToken,
// 	HrRoutes.approveReimbTrans
// );
// router.post(
// 	"/reject-reimbursement",
// 	jwtHelper.verifyToken,
// 	HrRoutes.rejectReimbTrans
// );

// configure tables
// router.get("/config/tables", ConfigRoutes.tables);

app.use("/api/", router);

// app.use(errorHelper.logErrorsToConsole);
// app.use(errorHelper.logErrorsToFile);
// app.use(errorHelper.clientErrorHandler);
// app.use(errorHelper.errorHandler);

app.listen(parseInt(process.env.SERVPORT), function () {
  console.log(
    `Node server is running on http://localhost:${process.env.SERVPORT}/api/`,
  );
});
