module.exports = class Store {

  constructor() {
    this.data = [];
    this.id_data = 0;
  }
 
  get(callback) {
    setTimeout(() => {
      callback(this.data);
    }, 1000);
  }

  getId(pathname, callback) {
    setTimeout(() => {
      let length = pathname.lenth;
      pathname = pathname.slice(7, length);
      this.data.forEach(note => {
        if(note.id == pathname) {
          callback(note);
        }
      });
    }, 1000);
  }

  add(fields, callback) {
    setTimeout(() => {
      fields.id = i++;
      storageArr.push(fields);
      callback(storageArr);  
    }, 0);
  }

  del(pathname, callback) {
    setTimeout(() => {
      let length = pathname.lenth;
      pathname = pathname.slice(7, length);
      storageArr.forEach((resource, index) => {
        if(resource.id == pathname) storageArr.splice(pathname, 1);
        storageArr.forEach((item, index) => {
          item.id = index;
        });
      });
      callback(storageArr);  
    }, 0);
  }

  put(pathname, fields, callback) {
    setTimeout(() => {
      let length = pathname.lenth;
      pathname = pathname.slice(7, length);
      storageArr.forEach((resource) => {
        if(resource.id == pathname) resource.name = fields.name; 
      });
      callback(storageArr);
    }, 0);
  }

};
