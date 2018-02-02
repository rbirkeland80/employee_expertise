const routes = require('express').Router();
const employees = require('./employees');
const knowledgeBase = require('./knowledgeBase');
const levels = require('./levels');
const permissions = require('./permissions');
const profiles = require('./profiles');


routes.get('/', function(req, res) {
    res.send('im the api node!'); 
});

routes.use('/employees', employees);
routes.use('/knowledgebase', knowledgeBase);
routes.use('/levels', levels);
routes.use('/permissions', permissions);
routes.use('/profiles', profiles);

module.exports = routes;