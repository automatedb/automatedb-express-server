const expect = require('expect');
const Controller = require('../../app/libs/Controller');

describe("Controller", () => {
    describe("#constructor", () => {
        it("Should return message", () => {
            const controller = new Controller('logger');

            expect(controller._logger).toBe('logger');
        });
    });
});