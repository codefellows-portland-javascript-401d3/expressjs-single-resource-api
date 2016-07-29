# express-mongo-rest-api

This is an http server that stores data in MongoDB using Mongoose.

### Directions to use
1. `npm install` from the command line
2.  [Download MongoDB](https://www.mongodb.com/download-center#community)
3.  Start the database `mongod --dbpath [path to your MongoDB folder here]`
4.  Start the server by running `npm start`  
5. use an application like [Postman](https://www.getpostman.com/) to make calls to the API

### API Calls

# Notes
- `GET /api/notes` returns all notes
- `GET /api/notes/:id` returns a note by id
- `GET api/notes?important=true` returns all notes marked important
- `POST /api/notes` adds a note
- `PUT /api/notes/:id` updates a note
- `DELETE /api/notes/:id` deletes the selected notes

# Users
- `GET /api/users` returns all users
- `GET /api/users/:id` returns a user by id
- `POST /api/users` adds a note
- `PUT /api/users/:id` updates a user
- `DELETE /api/users/:id` deletes the selected user

# Misc things to keep in mind
- `GET` will only return items if they exist in the database
- `POST` and `PUT` requests must be valid JSON.

### Ways to contribute
- Report any bugs or feature requests by opening up a new GitHub issue
- Fork this repo > code away > submit a PR to the master branch when complete
