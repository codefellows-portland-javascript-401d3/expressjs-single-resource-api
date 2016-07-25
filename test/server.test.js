const chai = require(`chai`);
const chaiHttp = require(`chai-http`);
const assert = chai.assert;
const server = require(`../server`);
const port = process.env.PORT || 3000;
chai.use(chaiHttp);

const request = chai.request(server);


describe(`server e2e testing`, () => {
  it(`tests /`, done => {
    request
      .get(`/`)
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });

  it(`tests /notes`, done => {
    request
      .get(`/notes`)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, []);
        done();
      });
  });

  it(`tests /notes/id`, done => {
    request
      .post(`/notes`)
      .end((err, res) => {
        assert.equal(res.status, 200);
        
        done();
      });
  });






});