const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.isOk(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .get("/hello?name=xy_z")
        .end(function (err, res) {
          assert.isOk(res.status, 200);
          assert.equal(res.text, "hello xy_z");
          done();
        });
    });
    // #3
    test('send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({ "surname": "Colombo" })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          assert.equal(res.body.surname, "Colombo");

          done();
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({ "surname": "da Verrazzano" })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          assert.equal(res.body.surname, "da Verrazzano");
          done();
        });
    });
  });
});

const Browser = require("zombie");
//Browser.localhost('http://localhost:3000')
const browser = new Browser();

suite("Functional Tests with Zombie.js", function () {
  suiteSetup(function (done) {
    return browser.visit('http://localhost:3000', done)
  }),

    suite('"Famous Italian Explorers" form', function () {
      // #5
      test('submit "surname" : "Colombo" - write your e2e test...', function (done) {

        browser.fill('surname', 'colombo');
        browser.pressButton('submit')
        browser.assert.success();
        done();
      });
    });
  // #6
  test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
    browser.fill('surname', 'vespucci');
    browser.pressButton('submit')
    browser.assert.success();

    done();
  });

});
