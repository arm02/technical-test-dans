const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    if (user) {
      res.send({ message: "Akun Berhasil Mendaftar!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          returnValue: 404,
          message:
            "Akun tidak di temukan.",
        });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          returnValue: 401,
          token: null,
          message:
            "Password Anda Salah!",
        });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        returnValue: 200,
        message: "Success",
        object: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          token: token
        },
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
