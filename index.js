const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('express').Router();
const passport = require('passport');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

class Server {
    constructor() {
        this.initDB();
        this.initViewEngine();
        this.initExpressMiddleware();
        this.initPassport();
        this.initRoutes();
        this.start();
    }

    start() {
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`);
        });
    }

    initViewEngine() {
        app.engine('jade', require('jade').__express);
        app.set('view engine', 'jade');
    }

    initExpressMiddleware() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(session({ secret: 'someSecretToSaveSomewhereElse' }));
        app.use(express.static(__dirname + '/client'));
    }

    initPassport() {
        require('./config/passport')(passport);
        app.use(passport.initialize());
        app.use(passport.session());
    }

    initDB() {
        const configDB = require('./config/database.js');

        mongoose.Promise = global.Promise;
        mongoose.connect(configDB.url, { useMongoClient: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('openUri', function() {
            console.log('connected to db');
        });
    }

    initRoutes() {
        const api = require('./apiRoutes');
        const authentication = require('./login')(passport);

        router.get('/', (req, res) => {
            res.sendFile(__dirname + 'client/index.html');
        });

        app.use('/auth', authentication);
        app.use('/api', isLoggedIn, api);

        function isLoggedIn (req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            }

            res.redirect('/');
        };
        // app.use('assets/avatar/mmyl.png') // should be the api to load avatar
    }
}

new Server();
