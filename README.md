#Express Routing for the existing data storage

##Codefellows 401d3

###Aaron Bini - 07/26/2016

###Routes

GET to "/movies" to get all movies currently in the movie storage. There is one movie pre-saved.

GET to "/movies/id", where 'id' is the id of the movie you're searching for in order to retrieve a single movie from storage.

POST to "/movies" => Send JSON in request body like this: {title: [movie title], year: [year]} for the movie you'd like to add to storage.

PUT to "/movies/id" to replace movie with the id that you pass in with new movie sent as JSON in request body as specified above.

DELETE to "/movies/id" to delete movie with the id that you pass in from storage.
