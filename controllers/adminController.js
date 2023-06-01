const admin = require("firebase-admin");
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
    await db.collection("files").doc(fileId).delete();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getDashboard,
  deleteFile,
};