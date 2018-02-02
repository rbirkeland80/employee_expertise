const mongoose = require('mongoose');
const BaseSchema = require('../common/model.js');

const profileProperties = {
    employeePositionName: {
        default: 'Software Engineer',
        type: String,
        required: [true, 'The name of employee position is required'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z][a-zA-Z0-9 \-\&]+$/.test(v);
            },
            message: '{VALUE} is invalid value for employee position name'
        }
    },
    knowledgeBase: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KnowledgeBase'
    }]
};

const profileSchema = new BaseSchema(profileProperties);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;