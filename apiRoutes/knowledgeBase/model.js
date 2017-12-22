const mongoose = require('mongoose');
const BaseSchema = require('../common/model.js');

function getStringType (property, required = false) {
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

    return objDescriptor;
};

const knowledgeBaseProperties = {
    assignedToProfile: [mongoose.Schema.Types.ObjectId],
    hierarchy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KnowledgeBase'
    }],
    hierarchyLevel: {
        enum: [0, 1],
        required: [true, 'Value for hierarchyLevel is required'],
        type: Number
    },
    topics: [
        {
            expertiseScore: {
                type: String,
                validate: /[0-9]|[1-9][0-9]|100|not evaluated/,
                default: 'not evaluated'
            },
            name: getStringType('name', true),
            profileAssignmentMapping: [{
                [mongoose.Schema.Types.ObjectId]: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Level'
                }
            }],
            references: [{
                displayName: String,
                linkValue: String
            }]
        }
    ]
};

const knowledgeSchema = new BaseSchema(knowledgeBaseProperties);

const KnowledgeBase = mongoose.model('KnowledgeBase', knowledgeSchema);

module.exports = KnowledgeBase;
