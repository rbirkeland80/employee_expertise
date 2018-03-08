const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../routes/api/employees/model.js');

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
                     return done('Oops! Wrong username or password.', false);
                }

                if (!employee.validPassword(password)) {
                    return done('Oops! Wrong username or password.', false);
                }
    
                return done(null, employee);
            })
            .catch(error => {
                return done(error);
            });
    }));
};

module.exports = configurePassport;
