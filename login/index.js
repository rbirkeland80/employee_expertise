const routes = require('express').Router();
const Employee = require('../apiRoutes/employees/model.js');

function returnRoutes (passport) {
    routes.route('/login')
        .post(passport.authenticate('local'), (req, res) => {
            res.send('I am login post');
        });


    // routes.route('/logout')
    //     .post((req, res) => {
    //         res.send('I am logout post');
    //     });

    return routes;
}


module.exports = returnRoutes;
