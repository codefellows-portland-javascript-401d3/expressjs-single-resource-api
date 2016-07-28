module.exports = class Store {
  constructor() {
    this.data = [];
    this.id_stack = 0;
  }

  getAll() {
    return Promise.resolve(this.data);
  }

  get(id) {
    return new Promise( (resolve, reject) => {
      const item = this.data.find( u => u.id == id);
      if (item) resolve (item);
      else reject({code:400, error:`id "${id}" does not exist`});
    });
  }

  add(data) {
    if (!data.id && data.id !== 0) data['id'] = this.id_stack++;
    this.data.push(data);
    return Promise.resolve(data);
  }

  update(id, data) {
    return new Promise( (resolve, reject) => {
      const index = this.data.findIndex ( u => u.id == id);
      if (index === -1) return this.add(data);
      data.id = id;
      this.data[index] = data;
      resolve(data);
    });
  }

  delete(id) {
    return new Promise( (resolve, reject) => {
      const index = this.data.findIndex( u => u.id == id);
      if (index !== -1) {
        const deleted = this.data.splice(index,1)[0];
        resolve(deleted);
      }
      else reject({code:400, error: `id "${id}" does not exist`});
    });
  }

  length() {
    return Promise.resolve(this.data.length);
  }
};
