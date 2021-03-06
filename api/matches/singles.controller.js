const Singles = require('./singles.dao');

const createSingle = function (req, res, next) {
  const single = {
    playerA: req.body.playerA,
    playerB: req.body.playerB,
    scoreA: req.body.scoreA,
    scoreB: req.body.scoreB,
    playedOn: req.body.playedOn
  };

  Singles.create(single, (err, single) => {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      message: "Single created successfully",
      created: single,
    })
  })
}

const getSingles = function (req, res, next) {
  Singles.get({}, (err, singles) => {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      singles: singles
    })
  })
}

const updateSingle = function (req, res, next) {
  const single = {
    playerA: req.body.playerA,
    playerB: req.body.playerB,
    scoreA: req.body.scoreA,
    scoreB: req.body.scoreB,
    playedOn: req.body.playedOn
  };
  Singles.update({
    _id: req.params.id
  }, single, function (err, single) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      message: "Single updated successfully",
      updated: single,
    })
  })
}

const removeSingle = function (req, res, next) {
  Singles.delete({
    _id: req.params.id
  }, function (err, single) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      message: "Single deleted successfully",
      deleted: single,
    })
  })
}

module.exports = {
  createSingle,
  getSingles,
  updateSingle,
  removeSingle
}