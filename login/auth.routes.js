var Auth = require('./auth.controller');

module.exports = function(router) {
    router.post('/', Auth.login);
}