const routes = require('express').Router();
const Employee = require('../api/employees/model.js');

function returnRoutes (passport) {
    routes.route('/login')
        .post(passport.authenticate('local'), (req, res) => {
            const responseObj = {
                id: req.user._id,
                fullName: req.user.name,
                username: req.user.username
            };

            res.send(responseObj);
        });

    routes.route('/logout')
        .get((req, res) => {
            req.logout();
            res.status(200).send({ status: true });
        });

    return routes;
}


module.exports = returnRoutes;
