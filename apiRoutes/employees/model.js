const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const BaseSchema = require('../common/model.js');
const permissions = require('../../common/constants/permission.js');

function getStringType (property, required = false, defaultValue) {
    const objDescriptor = {
        type: String,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9 \-]+$/.test(v);
            },
            message: '{VALUE} is invalid value for ${property} name'
        }
    };

    if (required) {
        objDescriptor.required = [true, `Please specify value for ${property}`];
    }

    if (defaultValue) {
        objDescriptor.default = defaultValue;
    }

    return objDescriptor;
};

const employeeProperties = {
    carrierAdviser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    competenceManager: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    knowledgeBaseHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, 'KnowledgeBase should be specified'],
        ref: 'KnowledgeBase'
    }],
    level: getStringType('employeeLevel', true, 'Junior'),
    location: {
        country: getStringType('country', true),
        city: getStringType('city', true),
        office: getStringType('office', true),
        seat: getStringType('office')
    },
    name: {
        first: getStringType('firstName', true),
        last: getStringType('lastName', true),
        middle: getStringType('middleName')
    },
    password: { type: String, required: true }, // see requirement for this field
    permissions: [{
        type: String,
        default: permissions.rEmployee,
        enum: Object.values(permissions)
    }],
    phone: {
        mobile: getStringType('mobilePhone'),
        internal: getStringType('internalPhone')
    },
    profile: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'profile should be specified'],
        ref: 'Profile'
    }],
    projectName:  getStringType('projectName'),
    username: {
        type: String,
        required: [true, 'Value for userName is required'],
        unique: [true, 'User with userName {VALUE} is already saved in the DB'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z]+$/.test(v);
            },
            message: '{VALUE} is invalid value for user name'
        }
    }
};

const employeeSchema = new BaseSchema(employeeProperties);

employeeSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;