const path = require('path');
const _ = require('underscore');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

class Server {
    constructor(logger, config) {
        config.port = config.port || 3000;

        this._config = config;
        this._logger = logger;
        this._app = express();

        this._app.use(cors());
        this._app.use(cookieParser());
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({
            extended: false
        }));
    }

    setViewEngine(engine) {
        this._app.set('view engine', engine);
    }

    setViewsDirectory(path) {
        this._app.set('views', path);
    }

    setPublicDirectory(path) {
        this._app.use(express.static(path));
    }

    addMiddleware(route, middleware) {
        this._app.use(route, middleware);
    }

    addController(param) {
        param.services = param.services || [];

        const ctrl = new param.controller(this._logger, ...param.services);

        this._app[param.method.toLowerCase()](param.slug, ctrl[param.action].bind(ctrl));
    }

    run() {
        this._app.listen(this._config.port, () => this._logger.info(`The server is connected on: ${this._config.port}`));
    }
}

module.exports = Server;
