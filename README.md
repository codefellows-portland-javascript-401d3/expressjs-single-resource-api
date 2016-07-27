# expressjs-single-resource-api

This is an http server that acts as a simple data store, backed by in-memory storage objects that can be found in `data.js`.

### Directions to run
1. run `npm install` from the command line
1. `npm start` will start the server
2. open your browser to `localhost:8000` or use an application like [Postman](https://www.getpostman.com/)
3. enter a possible call from below

### Possible calls with current data
- `GET`/api/notes returns all notes
- `GET`/api/notes/:idNumber returns the note that has that id if it exists
- `POST`/api/notes adds a valid JSON object to notes
- `PUT`/api/notes/:idNumber updates the selected note if valid JSON
- `DELETE`/api/notes/:idNumber deletes the selected notes

also works if you replace `notes` with `books` i.e. `GET`/books returns all books

### Ways to contribute
- Report any bugs or feature requests by opening up a new GitHub issue
- Fork this repo > code away > submit a PR to the master branch when complete
