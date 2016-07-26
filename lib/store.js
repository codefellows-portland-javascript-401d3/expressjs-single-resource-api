class Store {
  constructor() {
    this.data = [];
    this.idCounter = 0;
  }

  readAll() {
    return this.data;
  }

  readId(id) {
    let index = this.data.findIndex(e => { return e.id == id;});
    if (index > -1) return this.data[index];
  }

  create(input) { //could I use 'data' here without a name collision?
    this.idCounter ++;
    let newRecord = {
      id: this.idCounter,
      data: input
    };
    this.data.push(newRecord);
    return JSON.stringify(newRecord);
  }

  update(id, data) { //seems like this op might cause objects to lose their id?
    let index = this.data.findIndex(e => { return e.id == id;});
    if (index > -1) {
      this.data[index] = data;
      return this.data[index];
    };
  }

  delete(id) {
    let index = this.data.findIndex(e => {
      // console.log('compare ' + e.id + ' to ' + id);
      // console.log(e.id == id);
      return e.id == id;});
    if (index > -1) {
      let data = this.data.splice(index, 1);
      return 'Removed: ', data;
    };
  };
}

module.exports = Store;
