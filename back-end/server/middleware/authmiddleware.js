const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.autherization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};