const routes = require('express').Router();
const Profile = require('./model.js');
const BaseCrud = require('../common/index.js');

const ProfileCrud = new BaseCrud(Profile);

routes.route('/')
    .get((req, res) => ProfileCrud.getAllEntries(req, res))
    .post((req, res) => ProfileCrud.saveNewEntry(req, res));

routes.param('id', (req, res, next, id) => ProfileCrud.checkIdParam(req, res, next, id));

routes.route('/:id')
    .get((req, res) => ProfileCrud.getEntryById(req, res))
    .put((req, res) => ProfileCrud.updateEntryById(req, res))
    .delete((req, res) => ProfileCrud.deleteEntryById(req, res));

module.exports = routes;