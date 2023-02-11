const mongoose = require("mongoose");

require("dotenv").config();

module.exports = {
  connectToDB: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("connected!");
    } catch (err) {
      console.log("Err", err);
    }
  },
};
