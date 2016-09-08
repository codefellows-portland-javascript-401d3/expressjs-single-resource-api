module.exports = class DataModule {
  constructor() {
    this.items = [];
    this.id_count = 0;
  }

  add(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        item.id = this.id_count++;
        let index = this.items.findIndex((e) => {
          return e.id === item.id;
        });
        if (index === -1) {
          this.items.push(item);
          resolve({message: 'Item successfully added.', item: item});
        } else {
          reject({message: 'Unsuccessful post request.'});
        }
      }, 300);
    });
  }

  getAll() {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        if (this.items.length > 0) {
          resolve({message: 'Items successfully retrieved.', items: this.items});
        } else {
          reject({message: 'There are no items in the database.'});
        }
      }, 300);
    });
  }

  getOne(id) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        const selected = this.items.filter(e => {
          return e.id == id;
        });
        if (selected.length > 0) {
          resolve({message: 'Item successfully retrieved.', item: selected});
        } else {
          reject({status: 400, message: 'Item not found.'});
        }
      }, 300);
    });
  }

  delete(id) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        const deleted = this.items.filter(e => {
          return e.id == id;
        });
        const index = this.items.findIndex(e => {
          return e.id == id;
        });
        if (deleted.length < 1) {
          reject({message: 'Item not found.'});
        } else {
          this.items.splice(index, 1);
          resolve({message: 'Item successfully deleted.', deleted: deleted});
        }
      }, 300);
    });
  }

  change(oldID, newItem) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        const altered = this.items.filter(e => {
          return e.id == oldID;
        });
        if (altered.length < 1) {
          reject({message: 'Item not found.'});
        } else {
          newItem.id = oldID;
          this.items.splice(oldID, 1, newItem);
          resolve({message: 'Item successfully updated.', oldItem: altered, newItem: newItem});
        }
      }, 300);
    });
  }

};
