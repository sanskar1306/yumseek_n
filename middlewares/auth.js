const jwt = require("jsonwebtoken");

const AuthMiddleware = {};

AuthMiddleware.generateAccessToken = function generateAccessToken(userLoad) {
  
  return jwt.sign(userLoad.toJSON(), process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

AuthMiddleware.verifyToken = function verifyToken(req, res, next) {
  let bearer = req.headers["token"];

  let token = bearer ? bearer.split(" ")[1] : null;

  if (!token) return res.status(401).json({ error: "Access Denied" });

  function verifyCallBack(error, decode) {
    if (error) return res.status(401).json({ error: "Access Denied" });
      
    res.decoded = decode;

    return next();
  }

  return jwt.verify(token, process.env.TOKEN_SECRET, verifyCallBack);
};

module.exports = AuthMiddleware;



// module.exports = function (req, res, next) {
//   const token = req.header("auth-token");
//   if (!token) return res.status(401).send("Access Denied");

//   try {
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).send("Invalid Token");
//   }
// };
