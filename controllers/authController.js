const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ status: "401 Unauthorized"})
  }
  
  try {
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = userVerified
    next()
  } catch (error) {
    res.status(401).json({ status: "401 Unauthorized"})
  }
  res.json({ status: "Token Recieved"})
};
