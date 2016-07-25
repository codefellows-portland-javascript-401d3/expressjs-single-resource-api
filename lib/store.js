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
      this.data.forEach(object => {
        if(object.id == pathname) {
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
      let length = pathname.lenth;
      pathname = pathname.slice(7, length);
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
      let length = pathname.length;
      pathname = pathname.slice(7, length);
      this.data.forEach(resource => {
        if(resource.id == pathname) resource.name = fields.name; 
      });
      callback(this.data);
    }, 0);
  }

};
