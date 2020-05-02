const controller = require('./auth.controller');

module.exports = function(router) {
    router.post('/login', controller.login);
    router.post('/token', controller.token);
    router.post('/logout', controller.logout);
}