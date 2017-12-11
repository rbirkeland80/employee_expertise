const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../apiRoutes/employees/model.js');

function configurePassport (passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy((username, password, done) => {
        Employee.findOne({ username :  username }, (err, user) => { // rework this to then catch!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }

            if (!user.verifyPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            return done(null, user);
        });

    }));

    return passport;
};

module.exports = configurePassport;
