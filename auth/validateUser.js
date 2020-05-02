const { accessTokenSecret } = require('./config');

const extractUserFromJWTIfValid = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  } else {
      return res.sendStatus(401);
  }
};

module.exports = extractUserFromJWTIfValid;