const routes = require('express').Router();
const employees = require('./employees');
const levels = require('./levels');
const profiles = require('./profiles');


routes.get('/', function(req, res) {
    res.send('im the api node!'); 
});

routes.use('/employees', employees);
routes.use('/levels', levels);
routes.use('/profiles', profiles);

module.exports = routes;