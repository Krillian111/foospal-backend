var Auth = require('./auth.controller');

module.exports = function(router) {
    router.post('/login', Auth.login);
    router.post('/token', Auth.token);
    router.post('/logout', Auth.logout);
}