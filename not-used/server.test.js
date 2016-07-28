const chai = require(`chai`);
const chaiHttp = require(`chai-http`);
const assert = chai.assert;
const server = require(`../server`);
const port = process.env.PORT || 3000;
chai.use(chaiHttp);

const request = chai.request(server);


// describe(`server e2e testing`, () => {
//   it(`tests /`, done => {
//     request
//       .get(`/`)
//       .end((err, res) => {
//         assert.equal(res.status, 200);
//       });
//     done();
//   });

//   it(`tests /notes`, done => {
//     request
//       .get(`/notes`)
//       .end((err, res) => {
//         assert.equal(res.status, 200);
//         assert.deepEqual(res.body, []);
//         done();
//       });
//   });

//   it(`tests post req to /notes`, done => {
//     request
//       .post(`/notes`)
//       .end((err, res) => {
//         assert.equal(res.status, 200);
//         assert.deepEqual(res.body, {name: '', id: 0});
//         done();
//       });
//   });

//   it(`tests getting a resource by id`, done => {
//     request
//       .get(`/notes/0`)
//       .end((err, res) => {
//         assert.equal(err, null);
//         assert.deepEqual(res.body, {name: "", id: 0});
//         done();
//       });
//   });

//   it(`tests put req to /notes`, done => {
//     request
//       .put(`/notes/0`)
//       .end((err, res) => {
//         assert.equal(err, null);
//         done();
//       });
//   });


//   it(`tests delete req to /notes`, done => {
//     request
//       .del(`/notes/0`)
//       .end((err, res) => {
//         assert.deepEqual(res.body, {name: "", id:0});
//         done();
//       });
//   });


// });