const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader)
      return res.status(401).json({ msg: 'No token, authorization denied' });

    const token = authHeader.split(' ')[1]; // assuming Bearer <token>
    if (!token)
      return res.status(401).json({ msg: 'No token, authorization denied' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({ msg: 'Token is not valid' });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
