const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token after 'Bearer'  
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied." });
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if (err) {      
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.admin = user;
    next(); 
  });
};

module.exports = authenticate;
