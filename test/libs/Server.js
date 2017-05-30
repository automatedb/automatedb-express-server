const expect = require('expect');
const winston = require('winston');
const Server = require('../../app/libs/Server');

describe("Server", () => {
    describe("#contructor", () => {
       it("Should check a logger is set", () => {
           const logger = new (winston.Logger)({ });
           const server = new Server(logger, {
               port: undefined
           });

           expect(server._logger).toBe(logger);
       });
    });

    describe("#addController", () => {
        it("Should check if controller is included in express", () => {
            const server = new Server({}, {
                port: undefined
            });

            server._app = {
                get(slug, controller) {
                    expect(slug).toBe('/');
                    expect(typeof controller).toBe('function');
                }
            };

            server.addController({
                "slug": "/",
                "action": "index",
                "controller": class IndexCtrl {
                    index() { }
                },
                "method": "GET"
            });
        });
    });

    describe("#setViewEngine", () => {
        it("Should check if the view engine is set", () => {
            const server = new Server({}, {
                port: undefined
            });

            server._app = {
                set: (key, value) => {
                    expect(key).toBe('view engine');
                    expect(value).toBe('pug');
                }
            };

            server.setViewEngine('pug')
        });
    });

    describe("#setViewsDirectory", () => {
        it("Should check if the views directory is set", () => {
            const server = new Server({}, {
                port: undefined
            });

            server._app = {
                set: (key, value) => {
                    expect(key).toBe('views');
                    expect(value).toBe('views');
                }
            };

            server.setViewsDirectory('views');
        });
    });

    describe("#setPublicDirectory", () => {
        it("Should check if the public directory is set", () => {
            const server = new Server({}, {
                port: undefined
            });

            server._app = {
                use: (value) => {
                    expect(typeof value).toBe('function');
                }
            };

            server.setPublicDirectory('path');
        });
    });

    describe("#addMiddleware", () => {
        it("Should check if the add middleware work", () => {
            const server = new Server({}, {
                port: undefined
            });

            server._app = {
                use: (key, value) => {
                    expect(key).toBe('key');
                    expect(value).toBe('value');
                }
            };

            server.addMiddleware('key', 'value');
        });
    });

    describe("#run", () => {
        it("Should check if the listen method of express is called", () => {
            const server = new Server({}, {
                port: undefined
            });

            server._app = {
                listen: (port, callback) => {
                    expect(port).toBe(3000);
                }
            };

            server.run();
        });
    });
});