const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../apiRoutes/employees/model.js');

function configurePassport (passport) {
    passport.serializeUser((employee, done) => {
        done(null, employee.id);
    });

    passport.deserializeUser((id, done) => {
        Employee.findById(id, (err, employee) => {
            done(err, employee);
        });
    });

    passport.use(new LocalStrategy((username, password, done) => {
        Employee.findOne({ username :  username })
            .then(employee => {
                if (!employee) {
                    return done('No employee found.', false);
                }

                if (!employee.validPassword(password)) {
                    return done('Oops! Wrong password.', false);
                }
    
                return done(null, employee);
            })
            .catch(error => {
                return done(err);
            });
    }));
};

module.exports = configurePassport;
