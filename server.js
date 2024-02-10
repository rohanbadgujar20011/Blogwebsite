const express = require("express");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const dotenv = require("dotenv");
dotenv.config();
PORT = process.env.PORT;
require("./config/db");
const cors = require("cors");

const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res, next) => {
  res.send("hello");
});

//define port

app.listen(PORT, () => console.log(`app started at ${PORT}...`));