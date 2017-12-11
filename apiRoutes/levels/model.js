const mongoose = require('mongoose');
const BaseSchema = require('../common/model.js');

const levelSchema = new BaseSchema({ rank: Number });

const Level = mongoose.model('Level', levelSchema);

module.exports = Level;