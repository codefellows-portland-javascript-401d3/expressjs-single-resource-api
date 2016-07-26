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

  getId(id, callback) {
    setTimeout(() => {
      this.data.forEach(object => {
        if(object.id == id) {
          callback(object);
        }
      });
    }, 1000);
  }

  add(fields, callback) {
    setTimeout(() => {
      fields.id = this.id_data++;
      this.data.push(fields);
      callback(fields.id, this.data);  
    }, 0);
  }

  del(pathname, callback) {
    setTimeout(() => {
      this.data.forEach((resource, index) => {
        if(resource.id == pathname) { 
          this.data.splice(pathname, 1);
          resource.id = index;
        }
      });
      callback(this.data);  
    }, 0);
  }

  put(pathname, fields, callback) {
    setTimeout(() => {  
      this.data.forEach(resource => {
        if(resource.id == pathname) resource.name = fields.name; 
      });
      callback(this.data);
    }, 0);
  }

};
