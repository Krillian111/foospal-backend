var Singles = require('./singles.controller');
const accessTokenSecret = process.env.ACCESSTOKENSECRET;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
  };

module.exports = function(router) {
    router.post('/singles', authenticateJWT, Singles.createSingle);
    router.get('/singles', authenticateJWT, Singles.getSingles);
    router.put('/singles/:id', authenticateJWT, Singles.updateSingle);
    router.delete('/singles/:id', authenticateJWT, Singles.removeSingle);
}