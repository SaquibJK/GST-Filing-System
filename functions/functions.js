const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const path = require("path");

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to DB");
    } catch (error) {
      console.log(error);
    }
  },
  uniqueFileName: (originalFilename) => {
    const { name, ext } = path.parse(originalFilename);
    const randomNumber = new Date().getTime(); // Generate a random
    const filename = `${name}-${randomNumber}${ext}`;
    return filename;
  },
};
