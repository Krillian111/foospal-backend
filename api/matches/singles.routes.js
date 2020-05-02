const validateUser = require('../../auth/validateUser');
const controller = require('./singles.controller');

module.exports = function(router) {
    router.post('/singles', validateUser, controller.createSingle);
    router.get('/singles', controller.getSingles);
    router.put('/singles/:id', validateUser, controller.updateSingle);
    router.delete('/singles/:id', validateUser, controller.removeSingle);
}