const routes = require('express').Router();
const Permission = require('./model.js');
const BaseCrud = require(__dirname + '/../common/index.js');

const PermissionCrud = new BaseCrud(Permission);

routes.route('/')
    .get((req, res) => PermissionCrud.getAllEntries(req, res))
    .post((req, res) => PermissionCrud.saveNewEntry(req, res));

routes.param('id', (req, res, next, id) => PermissionCrud.checkIdParam(req, res, next, id));

routes.route('/:id')
    .get((req, res) => PermissionCrud.getEntryById(req, res))
    .put((req, res) => PermissionCrud.updateEntryById(req, res))
    .delete((req, res) => PermissionCrud.deleteEntryById(req, res));

module.exports = routes;