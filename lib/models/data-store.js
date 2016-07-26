module.exports = class DataModule {
  constructor() {
    this.movies = [{title: 'Ghost Busters', year: 1984, id: 0}];
    this.id_count = 1;
  }

  addMovie(movie) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let index;
        this.movies.forEach((m,i) => {
          if (m.title === movie.title) {
            index = i;
          }
        });
        if (index === undefined) {
          movie.id = this.id_count++;
          this.movies.push(movie);
          resolve({message: 'Movie successfully added.', movie: movie});
        } else {
          reject({message: 'That movie is already in the database.'});
        }
      }, 300);
    });
  }

  getAll () {
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

  getOne(title) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        const selected = this.movies.filter(m => {
          return m.title === title;
        });
        if (selected.length > 0) {
          resolve({message: 'Movie successfully retrieved.', movie: selected});
        } else {
          reject({message: 'Sorry that movie is not in the database.'});
        }
      }, 300);
    });
  }

  deleteMovie(title) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        var index;
        this.movies.forEach((m,i) => {
          if (m.title === title) {
            index = i;
          }
        });
        if (index === undefined) {
          reject({message: 'Movie not found.'});
        } else {
          this.movies.splice(index, 1);
          resolve({message: 'Movie successfully deleted.', deleted: title});
        }
      }, 300);
    });
  }

  changeMovie(oldTitle, newMovie) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        var index;
        this.movies.forEach((m,i) => {
          if (m.title === oldTitle) {
            index = i;
          }
        });
        if (index === undefined) {
          reject({message: 'Movie not found.'});
        } else {
          newMovie.id = this.id_count++;
          this.movies.splice(index, 1, newMovie);
          resolve({message: 'Movie successfully updated.', old: oldTitle, new: newMovie});
        }
      }, 300);
    });
  }

};
