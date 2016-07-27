class Store {
  constructor() {
    this.data = [];
    this.idCounter = 0;
  }

  readAll() {
    return Promise.resolve(this.data);
  }

  readId(id) {
    return new Promise((resolve,reject) => {
      let index = this.data.findIndex(e => { return e.id == id;});
      if (index > -1) resolve(this.data[index]);
      else reject({ code: 400, error: `id "${id}" does not exist"` });
    });
  }

  create(data) {
    this.idCounter ++;
    let newRecord = {
      id: this.idCounter,
      data
    };
    this.data.push(newRecord);
    return Promise.resolve(JSON.stringify(newRecord));
  }

  update(id, data) {
    return new Promise((resolve, reject) => {
      let index = this.data.findIndex(e => { return e.id == id;});
      if (index > -1) {
        this.data[index].data = data;
        resolve(JSON.stringify(this.data[index]));
      }
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      let index = this.data.findIndex(e => {return e.id == id;});
      if (index > -1) {
        let data = this.data.splice(index, 1);
        resolve(data);
      };
    });
  };
}

module.exports = Store;
