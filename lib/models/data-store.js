module.exports = class DataModule {
  constructor() {
    this.movies = [{title: 'Ghost Busters', year: 1984, id: 0}];
    this.id_count = 1;
  }

  addMovie(movie) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        movie.id = this.id_count++;
        let index = this.movies.findIndex((e) => {
          return e.id === movie.id;
        });
        if (index === -1) {
          this.movies.push(movie);
          resolve({message: 'Movie successfully added.', movie: movie});
        } else {
          reject({message: 'Unsuccessful post request.'});
        }
      }, 300);
    });
  }

  getAll() {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        if (this.movies.length > 0) {
          resolve({message: 'Movies successfully retrieved.', movies: this.movies});
        } else {
          reject({message: 'There are no movies in the database.'});
        }
      }, 300);
    });
  }

  getOne(id) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        const selected = this.movies.filter(e => {
          return e.id == id;
        });
        if (selected.length > 0) {
          resolve({message: 'Movie successfully retrieved.', movie: selected});
        } else {
          reject({message: 'Movie not found.'});
        }
      }, 300);
    });
  }

  deleteMovie(id) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        const deleted = this.movies.filter(e => {
          return e.id == id;
        });
        if (deleted.length < 1) {
          reject({message: 'Movie not found.'});
        } else {
          this.movies.splice(id, 1);
          resolve({message: 'Movie successfully deleted.', deleted: deleted});
        }
      }, 300);
    });
  }

  changeMovie(oldID, newMovie) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        const altered = this.movies.filter(e => {
          return e.id == oldID;
        });
        if (altered.length < 1) {
          reject({message: 'Movie not found.'});
        } else {
          newMovie.id = this.id_count++;
          this.movies.splice(oldID, 1, newMovie);
          resolve({message: 'Movie successfully updated.', oldMovie: altered, newMovie: newMovie});
        }
      }, 300);
    });
  }

};
