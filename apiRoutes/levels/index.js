const routes = require('express').Router();
const Level = require('./model.js');
const BaseCrud = require(__dirname + '/../common/index.js');

const LevelCrud = new BaseCrud(Level);

routes.route('/')
    .get((req, res) => LevelCrud.getAllEntries(req, res))
    .post((req, res) => LevelCrud.saveNewEntry(req, res));

routes.param('id', (req, res, next, id) => LevelCrud.checkIdParam(req, res, next, id));

routes.route('/:id')
    .get((req, res) => LevelCrud.getEntryById(req, res))
    .put((req, res) => LevelCrud.updateEntryById(req, res))
    .delete((req, res) => LevelCrud.deleteEntryById(req, res));

module.exports = routes;