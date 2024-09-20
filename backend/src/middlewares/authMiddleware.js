const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401);

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.admin = user;
    next();
  });
};

module.exports = authenticate;
