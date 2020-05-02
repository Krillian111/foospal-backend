const { users, accessTokenSecret, refreshTokenSecret } = require('./config');

const refreshTokens = [];

function login(req, res, next) {
  // Read username and password from request body
  const { username, password } = req.body;

  // Filter user from the users array by username and password
  const user = users.find(u => { return u.username === username && u.password === password });

  if (user) {
      // Generate an access token
      const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret, { expiresIn: '20m' });
      const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

      refreshTokens.push(refreshToken);

      res.json({
          accessToken,
          refreshToken
      });
  } else {
      res.send('Username or password incorrect');
  }
}

function token(req, res, next) {
  const { token } = req.body;

  if (!token) {
      return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
      return res.sendStatus(403);
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => {
      if (err) {
          return res.sendStatus(403);
      }

      const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

      res.json({
          accessToken
      });
  });
}

function logout (req, res) {
  const { token } = req.body;
  if (refreshTokens.filter(function(value, index, arr){return value === token;}).length === 0){
    res.send("Invalid refresh token!")
  } else {
    refreshTokens = refreshTokens.filter(function(value, index, arr){return value !== token;});
    res.send("Logout successful");
  }
}

module.exports = {
  token,
  login,
  logout,
}