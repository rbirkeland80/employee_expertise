const mongoose = require('mongoose');
const util = require('util');
const path = require('path');
const validationCodes = require(path.resolve('./', 'common/constants/codes.js'));

const Schema = mongoose.Schema;

function BaseModelSchema () {
    Schema.apply(this, arguments);

    this.add({
        //_id: Schema.Types.ObjectId,
        active: { type: Boolean, default: true },
        meta: {
            createdBy: {
                type: String,
                required: [true, 'Meta data is required. Please make sure that createdBy is properly set']
            },
            createdOn: {
                type: Date,
                required: [true, 'Meta data is required. Please make sure that createdOn is properly set']
            },
            lastUpdatedBy: {
                type: String,
                required: [true, 'Meta data is required. Please make sure that lastUpdatedBy is properly set']
            },
            lastUpdatedOn: {
                type: Date,
                required: [true, 'Meta data is required. Please make sure that lastUpdatedOn is properly set']
            }
        }
    });

    if (!this.obj || (this.obj && !this.obj.hasOwnProperty('name'))) {
        this.add({
            name: {
                type: String,
                required: [true, 'The name of level is required'],
                unique: [true, 'Level with name {VALUE} is already saved in the DB'],
                validate: {
                    validator: function(v) {
                        return /^[a-zA-Z][a-zA-Z0-9 \-\&]+$/.test(v);
                    },
                    message: '{VALUE} is invalid value for level name'
                }
            }
        });
    }

    this.methods.setMetadata = function(userId) {
        return new Promise((resolve, reject) => {
            if (!userId) {
                return reject({
                    code: validationCodes.preConditionFailed,
                    message: 'userId should be specified'
                });
            }

            this.meta = {
                createdBy: userId,
                createdOn: new Date(),
                lastUpdatedBy: userId,
                lastUpdatedOn: new Date()
            }

            return resolve(this);
        });
    }
};

util.inherits(BaseModelSchema, Schema);

module.exports = BaseModelSchema;