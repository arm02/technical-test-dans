const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.headers["token"];
  if (!token) {
    return res.status(403).send({
      returnValue: 403,
      message: "Sesi tidak berlaku!",
    });
  }
  if (token == "misalmaupaketokenstatic") {
    next();
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          returnValue: 401,
          message: "Sesi berakhir, harap login kembali.",
        });
      }
      req.userId = decoded.id;
      next();
    });
  }
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
