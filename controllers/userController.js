const User = require("../models/users");
const firebase = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { uniqueFileName } = require("../functions/functions");
const admin = require("firebase-admin");
const credentials = require("../key.json");

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize firebase app
firebase.initializeApp(firebaseConfig);
const storage = getStorage();

// Building file collection
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

const renderRegisterPage = (req, res) => {
  res.render("Register");
};

const renderLoginPage = (req, res) => {
  res.render("Login", { message: "Now Login with Provided Credentials" });
};

const renderUploadPage = (req, res) => {
  res.render("upload");
};

const handleFileUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("File not found. Try Again");
  }

  // Generate Unique name for each file
  const fileName = uniqueFileName(req.file.originalname);

  try {
    const StorageRef = ref(storage, fileName);
    const metadata = {
      contentType: req.file.mimetype,
    };

    await uploadBytes(StorageRef, req.file.buffer, metadata);
    const url = await getDownloadURL(StorageRef);

    if (url) {
      // Store file document in Firestore
      const fileJson = {
        fileName: fileName,
        downloadUrl: url,
        sentBy: req.user._id,
        fileSize: req.file.size,
      };

      const response = await db.collection("files").add(fileJson);
      return res.redirect(302, "/user/upload");
    }
  } catch (err) {
    console.log(err);
    if (err.message === "Invalid file type. Only Excel files are allowed.") {
      return res.status(400).send(err.message);
    }
    return res.status(500).send(err.message);
  }
};

module.exports = {
  renderRegisterPage,
  renderLoginPage,
  renderUploadPage,
  handleFileUpload,
};
