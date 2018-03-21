'use strict';
require('zone.js/dist/zone-node');
require('reflect-metadata');

const express = require('express');
const cors = require('cors')
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
        app.listen(port, function () {
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
        const whitelist = ['http://localhost:3000', 'http://localhost:4200'];
        const corsOptions = {
            origin: function (origin, callback) {
                origin = 'http://localhost:3000'; // hack for testing locally images
                if (whitelist.indexOf(origin) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            },
            credentials: true
        };

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(session({
            secret: 'someSecretToSaveSomewhereElse',
            cookie: { maxAge: 1000*60*10 },
            resave: true,
            saveUninitialized: true
        }));
        app.use(cors(corsOptions));
    }

    initPassport() {
        require('./config/passport')(passport);
        app.use(passport.initialize());
        app.use(passport.session());
    }

    initDB() {
        const configDB = require('./config/database.js');

        mongoose.Promise = global.Promise;
        mongoose.connect(configDB.url, {
            useMongoClient: true
        });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('openUri', function () {
            console.log('connected to db');
        });
    }

    initRoutes() {
        const api = require('./routes/api');
        const avatar = require('./routes/avatar');
        const authentication = require('./routes/login')(passport);

        app.use('/auth', authentication);
        app.use('/api', isLoggedIn, api);
        app.use('/avatar', isLoggedIn, avatar);

        app.use('/', (req, res) => res.render('browser/index', { req, res }));
        app.use(express.static(`${__dirname}/dist`));
        app.get('*', (req, res) => res.redirect('/'));

        function isLoggedIn(req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            }

            res.status(401).send('You are not authorized to view the data');
        };
    }
}

new Server();
