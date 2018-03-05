'use strict';
require('zone.js/dist/zone-node');
require('reflect-metadata');

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
        this.initExpressMiddleware();
        this.initAngularUniversal();
        this.initPassport();
        this.initRoutes();
        this.start();
    }

    start() {
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`);
        });
    }

    initAngularUniversal() {
        const ngUniversal = require('@nguniversal/express-engine');
        const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

        const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

        app.engine('html', ngUniversal.ngExpressEngine({
            bootstrap: AppServerModuleNgFactory,
            providers: [
                provideModuleMap(LAZY_MODULE_MAP)
            ]
        }));
        app.set('view engine', 'html');
        app.set('views', 'dist');
    }

    initExpressMiddleware() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(session({ secret: 'someSecretToSaveSomewhereElse', resave: true, saveUninitialized: true }));
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
        const api = require('./routes/api');
        const authentication = require('./routes/login')(passport);
        const errorHandler = require('./routes/error');

        app.use('/auth', authentication);
        app.use('/api', isLoggedIn, api);

        app.use('/', (req, res) => { console.log('root'); res.render('browser/index', {req, res}) });
        app.use(express.static(`${__dirname}/dist`));
        app.get('*', (req, res) => { console.log('redirect'); res.redirect('/')});

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
