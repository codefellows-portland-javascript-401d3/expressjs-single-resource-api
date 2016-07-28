module.exports = class Store {

  constructor() {
    this.data = [];
    this.id_data = 0;
  }
 

  get() {
    return new Promise((resolve, reject) => {
      
      if(this.data) {
        resolve(this.data);
      } else {
        reject({error: `No files found`});
      }

    });
  }  

  getId(id) {
    return new Promise((resolve, reject) => {
      this.data.forEach(obj => {
        if(obj.id == id) {
          resolve(obj);
        } else {
          reject({error: `No matching ID in system`});
        }
      });
    });
  }



  add(fields) {
    return new Promise((resolve, reject) => {
      fields.id = this.id_data++;
      this.data.push(fields);
      if (fields) resolve(fields);
      else reject({error: `No data added`});
    });

  }

  del(pathname) {
    return new Promise((resolve, reject) => {
      this.data.forEach((obj, index) => {
        if(obj.id == pathname) {
          this.data.splice(pathname, 1);
          obj.id = index;
          resolve(obj);
        } else {
          reject({error: `No matching id to delete`});
        }
      });
    });
  };

  put(pathname, fields) {
    return new Promise((resolve, reject) => {
      this.data.forEach(obj => {
        if(obj.id == pathname) {
          obj.name = fields.name;
          resolve(obj);
        } else reject({error: `No match for a name change`}); 
      });
    });
  };

};
