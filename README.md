# express-mongo-rest-api

This is an http server that stores notes and author data in MongoDB using Mongoose.

### Directions to use
1. `npm install` from the command line
2.  [Download MongoDB](https://www.mongodb.com/download-center#community)
3.  Start the database `mongod --dbpath [path to your MongoDB folder here]`
4.  Start the server by running `npm start`  
5. use an application like [Postman](https://www.getpostman.com/) to make calls to the API

### Data model info
- One to many relationship between authors(parent) and notes(children)
- An author can write many notes, and a note can have up to one author.
- Notes without an author are considered written by someone that wishes to remain anonymous
- New notes are anonymous by default

### API Calls

Notes
- `GET /api/notes` returns all notes
- `GET /api/notes/:id` returns a note by id
- `GET api/notes?important=true` returns all notes marked important
- `POST /api/notes` adds a note
- `PUT /api/notes/:id` updates a note
- `DELETE /api/notes/:id` deletes the selected notes

Authors
- `GET /api/authors` returns all authors
- `GET /api/authors/:id` returns an author by id
- `POST /api/authors` adds an author
- `PUT /api/authors/:id` updates an author
- `DELETE /api/authors/:id` deletes the selected author

Author and Note relationship
- `PUT /api/authors/:authorId/notes/:noteId` adds an author to a note
- `DELETE /api/authors/null/notes/:noteId` removes the author from a note
- `GET /api/authors/:authorId/countNotes` counts the number of notes written by that author
- `GET /api/authors/notes` returns the title and body for every note written by that author

Misc things to keep in mind
- `GET` will only return items if they exist in the database
- `POST` and `PUT` request bodies must be valid JSON.

### Coming soon
- Authentication and user management

### Ways to contribute
- Report any bugs or feature requests by opening up a new GitHub issue
- Fork this repo > code away > submit a PR to the master branch when complete
