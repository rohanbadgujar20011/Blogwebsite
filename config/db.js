const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
URL = process.env.URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(URL)
  .then(() => {
    console.log("connected!");
  })
  .catch((err) => {
    console.log(err);
  });
