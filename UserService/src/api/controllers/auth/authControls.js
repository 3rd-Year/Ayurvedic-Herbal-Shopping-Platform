const bcryptjs = require("bcryptjs");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const LocalStorage = require("node-localstorage").LocalStorage;
let localstorage = new LocalStorage("./scratch");
const dotenv = require("dotenv");

dotenv.config();

const register = async (req, res) => {
  // check whether the user already exists
  const exist = await User.findOne({
    email: req.body.email,
  });

  if (exist) {
    return res.status(400).json({ message: "User Already Exists !" });
  } else {
    // encrypt password
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      mobile: req.body.mobile,
      nicType: req.body.nicType,
      nic: req.body.nic,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      role: req.body.role,
      url: req.body.url,
      password: hashPassword,
    });

    if (
      req.body.firstname === "" ||
      req.body.lastname === "" ||
      req.body.email === "" ||
      req.body.mobile === "" ||
      req.body.nicType === "" ||
      req.body.nic === "" ||
      req.body.dob === "" ||
      req.body.gender === "" ||
      req.body.address === "" ||
      req.body.url === "" ||
      req.body.password === ""
    ) {
      return res.status(400).json({ message: "All the fields are required !" });
    } else {
      try {
        newUser.save();
        return res.status(200).json({
          user: newUser,
          message: "User Registration Successfull !",
        });
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }
  }
};

const login = async (req, res) => {
  const userData = await User.findOne({ email: req.body.email });

  if (!userData) {
    return res.status(400).send({
      Login: false,
      message: "Invalid email address",
    });
  } else {
    // compare encrypted and entered passwords
    const password = await bcryptjs.compare(
      req.body.password,
      userData.password,
    );

    // validating the password
    if (!password) {
      return res.status(400).send({
        Login: false,
        message: "Incorrect Password !",
      });
    } else {
      const isActive = userData.isActive;

      if (isActive) {
        const id = userData.id;
        const token = JWT.sign({ id }, process.env.SECRETE, {
          expiresIn: process.env.EXPIREIN,
        });

        return res.status(200).json({
          Login: true,
          Role: userData.role,
          message: "Login Successfull",
          token,
          userData,
        });
      } else {
        return res.status(400).send({
          Login: false,
          message: "Account is not Activated !",
        });
      }
    }
  }
};

const logout = async (req, res) => {
  // const refreashToken = req.params.authToken;

  localstorage.clear();

  try {
    // refreashTokens = refreashTokens.filter(
    // 	(token) => token !== refreashToken,
    // );
    res.status(200).json({
      message: "You are logged out successfully",
    });
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

module.exports = {
  register,
  login,
  logout,
};
