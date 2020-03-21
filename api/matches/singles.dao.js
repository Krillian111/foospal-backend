var mongoose = require('mongoose');
var singlesSchema = require('./singles.model');

singlesSchema.statics = {
    create : function(data, callback) {
        const hero = new this(data);
        hero.save(callback);
    },

    get: function(query, callback) {
        this.find(query, callback);
    },

    update: function(query, updateData, callback) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, callback);
    },

    delete: function(query, callback) {
        this.findOneAndDelete(query,callback);
    }
}

const singlesModel = mongoose.model('Singles', singlesSchema);
module.exports = singlesModel;