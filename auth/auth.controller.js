const users = [
  {
      username: 'john',
      password: 'password123admin',
      role: 'admin'
  }, {
      username: 'anna',
      password: 'password123member',
      role: 'member'
  }
];
const accessTokenSecret = process.env.ACCESSTOKENSECRET;
if ( ! accessTokenSecret ) {
  throw new Error("No access token set. Please use the environment variable ACCESSTOKENSECRET");
}
const refreshTokenSecret = process.env.REFRESHTOKENSECRET;
if ( ! accessTokenSecret ) {
  throw new Error("No refresh token set. Please use the environment variable REFRESHTOKENSECRET");
}
var refreshTokens = [];

exports.login = function (req, res, next) {
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

exports.token = function (req, res, next) {
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

exports.logout = function (req, res) {
  const { token } = req.body;
  if (refreshTokens.filter(function(value, index, arr){return value === token;}).length === 0){
    res.send("Invalid refresh token!")
  } else {
    refreshTokens = refreshTokens.filter(function(value, index, arr){return value !== token;});
    res.send("Logout successful");
  }
}