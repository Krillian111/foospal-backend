const extractUser = require('../../auth/extractUser');
const controller = require('./singles.controller');

module.exports = function(router) {
    router.post('/singles', extractUser, controller.createSingle);
    router.get('/singles', controller.getSingles);
    router.put('/singles/:id', extractUser, controller.updateSingle);
    router.delete('/singles/:id', extractUser, controller.removeSingle);
}