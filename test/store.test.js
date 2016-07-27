const chai = require(`chai`);
const assert = chai.assert;
const Store = require(`../lib/store`);
const store = new Store();





describe(`storage functionality`, () => {
  it(`gets the store data`, done => {
    store.get()
      .then(data => {
        assert.deepEqual(data, []);
        done();
      })
      .catch(done); 
  });

  it(`adds to the store data`, done => {
    store.add({name: `Arielle`})
      .then(object => {
        assert.deepEqual(object, {name: `Arielle`, id: 0});
        done();
      })
      .catch(done);
  });

  it(`gets information based on id`, (done) => {
    store.getId(0)
      .then( data => {
        assert.deepEqual(data, {name: `Arielle`, id: 0});
        assert.equal(data.id, `0`);
        done();
      })
      .catch(done);
  });

  it(`changes a current object on put`, (done) => {
    store.put(0, {name: `Superwoman`})
      .then(obj => {
        assert.deepEqual(obj, {name: `Superwoman`, id: 0});
        done();
      })
      .catch(done);
  });

  it(`deletes a resource from the storage`, (done) => {
    store.del(0)
      .then(obj => {
        // assert.deepEqual(obj, {name: `Superwoman`, id: 0});
        done();
      })
      .catch(done);
  });



});