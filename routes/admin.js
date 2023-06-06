const adminRouter = require("express").Router();
const jwtAuth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const adminController = require("../controllers/adminController");

// Render admin dashboard
adminRouter.get(
  "/dashboard",
  jwtAuth,
  roleCheck(["admin"]),
  adminController.getDashboard
);

// Delete File with FileId
adminRouter.delete(
  "/deleteFile/:fileId",
  jwtAuth,
  roleCheck(["admin"]),
  adminController.deleteFile
);

// Open Excel File
adminRouter.get(
  "/dashboard/files/:fileId",
  jwtAuth,
  roleCheck(["admin"]),
  adminController.renderExcelFile
);


module.exports = adminRouter;