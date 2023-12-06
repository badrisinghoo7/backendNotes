const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.varify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.body.userID = decoded.userID;
        req.body.username = decoded.username;
        next();
      } else {
        res.send({ msg: "You are not authorized" });
      }
    });
  } else {
    res.send({ msg: "Please Login" });
  }
};

module.exports = {
  auth,
};
