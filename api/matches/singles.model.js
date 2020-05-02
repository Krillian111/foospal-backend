var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var singlesSchema = new Schema({
  playerA: {
    type: String,
    unique: false,
    required: true,
  },
  playerB: {
    type: String,
    unique: false,
    required: true,
  },
  scoreA: {
    type: Number,
    unique: false,
    required: true,
  },
  scoreB: {
    type: Number,
    unique: false,
    required: true,
  },
  playedOn: {
    type: Date,
    unique: false,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = singlesSchema;