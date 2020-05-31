let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {
    /**
     * Test the POST  calculate function
     */
    describe("POST /api/tasks", () => {
        it("It should POST a new task", (done) => {
            const task = {
                price:100,
                discount:0.1,
                tax:1
            };
            chai.request(server)                
                .post("/api/calculate")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('price').eq(90);
                done();
                });
        });

    });
});


