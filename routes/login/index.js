const routes = require('express').Router();
const Employee = require('../api/employees/model.js');

function returnRoutes (passport) {
    routes.route('/login')
        .post(passport.authenticate('local'), (req, res) => {
            res.send({
                status: true,
                sessionTokenId: req.sessionID,
                user: {
                    fullName: req.user.name,
                    username: req.user.username
                }
            });
        });

    routes.route('/logout')
        .get((req, res) => {
            req.logout();
            res.status(200).send({ status: true });
        });

    return routes;
}


module.exports = returnRoutes;
