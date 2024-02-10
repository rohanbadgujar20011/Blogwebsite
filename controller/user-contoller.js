const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Blog = require("../model/Blog");

const getAllUser = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "users are not found" });
  }

  return res.status(200).json({ users });
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User is already exists!" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    user.save();
    return res.status(201).json({ user: user._id });
  } catch (e) {
    console.log(e);
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User is not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password!" });
  }
  const token = jwt.sign({ id: existingUser._id }, "passwordKey", {
    expiresIn: "1h",
  });

  return res.status(200).json({ token, user: existingUser._id });
};
const getSingle = async (req, res, next) => {
  const { id } = req.params;
  let existingUser;

  try {
    existingUser = await User.findOne({ _id: id });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User is not found" });
  }
  detailsuser = {
    name: existingUser.name,
    email: existingUser.email,
  };

  return res.status(200).json({ user: detailsuser });
};

const verifytoken = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  verifytoken,
  getSingle,
  getAllUser,
  signUp,
  logIn,
};
