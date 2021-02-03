const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { loginValidate, registerValidate } = require("./validate");

const register = async (req, res) => {
  const {error} = registerValidate(req.body);
  if (error) {
    return res.status(400).json({message: error});
  }

  const { name, email, password, admin } = req.body;

  const hashPass = bcrypt.hashSync(password);

  const selectedEmail = await User.findOne({ email });

  const selectedUsername = await User.findOne({ name });

  if (selectedEmail) {
    return res.status(400).json({ message: "Email already in use" });
  }

  if (selectedUsername) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const user = new User({
    name,
    email,
    password: hashPass,
    admin,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const {error} = loginValidate(req.body);
  if (error) {
    return res.status(400).json({message: error});
  }

  const { email, password } = req.body;
  const selectedUser = await User.findOne({ email });

  if (!selectedUser) {
    res.status(400).json({ message: "Email or password incorrect" });
  }

  const passwordAndUserMatch = bcrypt.compareSync(
    password,
    selectedUser.password
  );

  if (!passwordAndUserMatch) {
    res.status(400).json({ message: "Email or password incorrect" });
  }

  const token = jwt.sign(
    { _id: selectedUser._id, admin: selectedUser.admin },
    process.env.TOKEN_SECRET
  );

  res.header("Authorization", token);
  res.status(200).json({ message: "User logged" });
};

module.exports = {
  register,
  login,
};
