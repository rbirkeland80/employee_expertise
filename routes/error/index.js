const templates = require('./templates');

function defaultError (req, res) {
    return res
        .status(500)
        .send(templates.unexpectedError);
};

function notFound (req, res) {
    return res
        .status(404)
        .send(templates.notFound);
};

module.exports = {
    defaultError,
    notFound
};
