#Express Routing with a MongoDB database for storage

##Refactored to utilize Mongoose Schemas and MongoDB data storage;

##Codefellows 401d3

###Aaron Bini - 07/28/2016

###Movie Routes

GET to "/movies" to get all movies currently in the movie storage.

GET to "/movies/:id", where 'id' is the id of the movie you're searching for in order to retrieve a single movie from storage.

POST to "/movies" => Send JSON in request body like this: {title(required): <movie title (type: string)>, year(required): <year film was made (type: string in format '2016-05-05')>, gross(required): <box office gross profits (type: integer)>, category: <movie category (type: string)>, actors: <actors appearing in movie (type: array)>, awards: <movie awards (type: array), color: <defaults to true>} for the movie you'd like to add to storage.

PUT to "/movies/:id" to replace movie with new movie sent as JSON in request body as specified above.

DELETE to "/movies/:id" to delete specified movie.

PUT to "/movies/:movieid/actors/:actorid" to add an actor reference to the actors array for the selected movie

###Actor Routes

GET to "/actors" to get all actors currently in the movie storage.

GET to "/movies/id" to get a single movie.

POST to "/actors" => Send JSON in request body: {name(required): <actor name(type: string)>, DOB: <actor DOB((type: string in format '2016-05-05'), age: <automatically populated based on DOB>, active: <defaults to true>, movies: <movies the actor has been in (type: array)>, awards: <actor awards (type: array)>}

PUT to "/actors/id" to update actor with the new actor that is sent as JSON in request body as specified above.

DELETE to "/actors/:id" to delete specified actor.

PUT to "/actors/:actorid/movies/:movieid" to add a movie reference to the movies array for the selected actor.
