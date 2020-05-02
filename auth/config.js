const users = [
  {
      username: 'john',
      password: 'password123admin',
      role: 'admin',
  }, {
      username: 'anna',
      password: 'password123member',
      role: 'member',
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

module.exports = {
  users,
  accessTokenSecret,
  refreshTokenSecret,
}