const chai = require(`chai`);
const assert = chai.assert;
const Store = require(`../lib/store`);
const store = new Store();





describe(`storage functionality`, () => {
  it(`gets the store data`, done => {
    store.get(data => {
      assert.deepEqual(data, []);
      done();
    });
  });

  it(`adds to the store data`, done => {
    let fields = {name: `Arielle`};
    store.add(fields, (id, data) => {
      assert.deepEqual(data, [{name: `Arielle`, id: 0}]);
      done();
    });
  });

  it(`id count increments correctly`, done => {
    let fields = {name: `Mark`};
    store.add(fields, (id, data) => {
      assert.deepEqual(data, [
        {name: `Arielle`, id: 0},
        {name: `Mark`, id: 1}
      ]);
      done();
    });
  });

  it(`gets information based on id`, (done) => {
    let id = 1;
    store.getId(id, object => {
      assert.deepEqual(object, {name: `Mark`, id: 1});
      assert.equal(object.id, `1`);
      done();
    });
  });

  it(`deletes a resource from the storage`, (done) => {
    let pathname = 0;
    store.del(pathname, (data) => {
      assert.deepEqual(data, [{name: `Mark`, id: 1}]);
      done();
    });
  });

  it(`changes a current object on put`, (done) => {
    let pathname = 1;
    let fields = {name: `Superwoman`, id: 1};
    store.put(pathname, fields, data => {
      assert.deepEqual(data, [{name: `Superwoman`, id: 1}]);
      done();
    });
  });


});