const validationCodes = require(__dirname + '/../../common/constants/codes.js');

const defaultErrorMsg = 'Unexpected error happened. Please try again later.';

function handleErrorResponse (error, res) {
    const code = setResponseCode(error);
    const msg = error.message || defaultErrorMsg;

    if (error.code === validationCodes.preConditionFailed) {
        error.message = 'System was not able to save your request. Please make sure that your are properly logged in the system.';
    }

    res.status(code).send(msg);
};

function setResponseCode (error) {
    if (error.code >= 400 && error.code <= 599) {
        return error.code;
    }

    if (error.code === 11000 || error.code === 11001) {
        return 409; //conflict - duplicate entry
    }

    if (error.name === 'ValidationError') {
        return 422;
    }

    return 500;
};

class BaseCrud {
    constructor(model) {
        this.model = model;
    }

    checkIdParam(req, res, next, id) {
        if (!/^\w+$/.test(id)) {
            next(new Error('Logging that someone is trying to reach document with invalid id format.'));
        }
    
        next();
    }

    deleteEntryById(req, res) {
        return this.model.findByIdAndRemove().where('_id').equals(req.params.id)
            .then(data => {
                if (data === null) {
                    return res.status(204).send('There is nothing to delete');
                }

                res.send(data);
            })
            .catch(error => {
                handleErrorResponse(error, res);
            });
    }

    getAllEntries(req, res) {
        return this.model.find().where('active').equals(true).select({ meta: 0, __v: 0, active: 0, password: 0 })
            .then(data => {
                if (!data || data.length === 0) {
                    return res.status(204).send(data);
                }

                res.json(data);
            })
            .catch(error => {
                handleErrorResponse(error, res);
            });
    }

    getEntryById(req, res) {
        return this.model.findOne().where('_id').equals(req.params.id)
            .then(data => {
                if (!data || data.length === 0) {
                    return res.status(204).send(data);
                }

                res.json(data);
            })
            .catch(error => {
                handleErrorResponse(error, res);
            });
    }

    saveNewEntry(req, res, cb) {
        // investigate if&how body should be validated prior to delegating to it mongoose->mongo
        const collection = new this.model(req.body);

        return collection.setMetadata(1)
            .then(collection => {
                if (cb) {
                    cb(collection);
                }

                return collection.save();
            })
            .then(collection => {
                res.json(collection);
            })
            .catch(error => {
                handleErrorResponse(error, res);
            });
    }

    updateEntryById(req, res) {
        // investigate if&how body should be validated prior to delegating to it mongoose->mongo
        const bodyWithMetaAttr = Object.assign({}, req.body);

        bodyWithMetaAttr['meta.lastUpdatedBy'] = 2;
        bodyWithMetaAttr['meta.lastUpdatedOn'] = new Date();

        return this.model.findOneAndUpdate({ _id: req.params.id }, bodyWithMetaAttr, { new: true })
            .then(data => {
                if (data === null) {
                    return res.status(204).send('There is nothing to update');
                }

                res.json(data);
            })
            .catch(error => {
                handleErrorResponse(error, res);
        });
    }
};

module.exports = BaseCrud;
