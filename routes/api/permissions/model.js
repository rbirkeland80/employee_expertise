const mongoose = require('mongoose');
const BaseSchema = require('../common/model.js');

const permissionSchema = new BaseSchema();

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;