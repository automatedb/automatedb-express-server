const expect = require('expect');
const Response = require('../../app/libs/Response');

describe("Response", () => {
    describe("#setMessage", () => {
        it("Should return message", () => {
            const response = new Response();

            response.setMessage("message");

            expect(response._message).toBe("message");
        });
    });

    describe("#setData", () => {
        it("Should return data", () => {
            const response = new Response();

            response.setData("data");

            expect(response._data).toBe("data");
        });
    });

    describe("#render", () => {
        it("Should return an object with message and data", () => {
            const response = new Response();

            response.setMessage("message");
            response.setData("data");

            expect(response.render().toString()).toBe({
                message: "message",
                data: "data"
            }.toString());
        });
    });
});