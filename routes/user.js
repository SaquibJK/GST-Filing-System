const userRouter = require("express").Router();
const multer = require("multer");
const {renderRegisterPage,  renderLoginPage, renderUploadPage, handleFileUpload } = require("../controllers/userController");
const jwtAuth = require("../middleware/auth");

const fileUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // Check if the file type is allowed
    if (
      file.mimetype === "application/vnd.ms-excel" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Invalid file type. Only Excel files are allowed."), false); // Reject the file
    }
  },
});

// Render Register Page
userRouter.get("/", renderRegisterPage);

// Render Login Page
userRouter.get("/login", renderLoginPage);

// Render Upload Page
userRouter.get("/user/upload", jwtAuth, renderUploadPage);

// Handle Uploaded File
userRouter.post(
  "/user/upload",
  fileUpload.single("file"),
  jwtAuth,
  handleFileUpload
);

module.exports = userRouter;
