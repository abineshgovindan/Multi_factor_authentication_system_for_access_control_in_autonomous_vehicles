const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
function isAuthenticated(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// function isAuthenticated(req, res, next) {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     res.status(401);
//     throw new Error('🚫 Un-Authorized 🚫');
//   }

//   try {
//     const token = authorization.split(' ')[1];
//     console.log(process.env.JWT_ACCESS_SECRET);
    
//     const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//     req.payload = payload;
//   } catch (err) {
//     res.status(401);
//     if (err.name === 'TokenExpiredError') {
//       throw new Error(err.name);
//     }
//     throw new Error('🚫 Un-Authorized 🚫');
//   }

//   return next();
// }

module.exports = {
    // ... other modules
    isAuthenticated
}