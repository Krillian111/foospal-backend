const jwt = require('jsonwebtoken');
const { users, accessTokenSecret, refreshTokenSecret } = require('./config');

const refreshTokens = [];

function login(req, res, next) {
  // Read username and password from request body
  const { username, password } = req.body;

  // Filter user from the users array by username and password
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: '20m' }
    );
    const refreshToken = jwt.sign(
      { username: user.username, role: user.role },
      refreshTokenSecret
    );

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
    });
  } else {
    res.status(403).json({
      message: 'Username or password incorrect',
    });
  }
}

function token(req, res, next) {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }
  console.log(refreshTokens);
  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: '20m' }
    );

    res.json({
      accessToken,
    });
  });
}

function logout(req, res) {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((value) => value !== token);
  res.status(200).send({
    message: 'Logout successful',
  });
}

module.exports = {
  token,
  login,
  logout,
};
