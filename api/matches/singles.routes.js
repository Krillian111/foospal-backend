var Singles = require('./singles.controller');

module.exports = function(router) {
    router.post('/singles', Singles.createSingle);
    router.get('/singles', Singles.getSingles);
    router.put('/singles/:id', Singles.updateSingle);
    router.delete('/singles/:id', Singles.removeSingle);
}