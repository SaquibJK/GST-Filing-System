const admin = require("firebase-admin");
const { getStorage, ref, deleteObject } = require("firebase/storage");
const axios = require("axios");
const xlsx = require("xlsx");

const db = admin.firestore();

const getDashboard = async (req, res) => {
  try {
    const filesSnapshot = await db.collection("files").get();
    const list = filesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.render("Dashboard", { files: list });
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.status(500).json({ error: "Failed to retrieve files" });
  }
};

const deleteFile = async (req, res) => {
  const fileId = req.params.fileId;
  try {
    // Get the file document from Firestore
    const fileRef = db.collection("files").doc(fileId);
    const fileDoc = await fileRef.get();

    if (!fileDoc.data()) {
      return res.status(404).send("File not found");
    }

    const fileData = fileDoc.data();

    // Delete the file from Firebase Storage
    const storageRef = ref(getStorage(), fileData.fileName);
    await deleteObject(storageRef);

    // Delete the file document from Firestore
    await fileRef.delete();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const renderExcelFile = async (req, res) => {
  const fileId = req.params.fileId;

  try {
    const fileDoc = await db.collection("files").doc(fileId).get();

    if (!fileDoc.data()) {
      return res.status(404).send("File not found");
    }

    const fileData = fileDoc.data();
    const downloadUrl = fileData.downloadUrl;

    if (!downloadUrl) {
      return res.status(404).send("Download URL not found");
    }

  const excelUrl = downloadUrl

try {
  // Download the Excel file from the URL
  const response = await axios.get(excelUrl, { responseType: "arraybuffer" });
  const excelData = response.data;

  // Convert the Excel file to JSON
  const workbook = xlsx.read(excelData, { type: "buffer" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  console.log(jsonData);
  return res.render("File", {data: jsonData})
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Failed to fetch Excel data" });
}
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).json({ error: "Failed to retrieve file" });
  }
};

module.exports = {
  getDashboard,
  deleteFile,
  renderExcelFile
};