![cf](http://i.imgur.com/7v5ASc8.png) express-middleware
====

Create a body-parser express middleware and a error handler that are used by
your existing app.

## Description
1. Create an express middleware function that parses incoming JSON, 
on a successful parse the JSON object should be saved to `req.body`
and the next function called. On a failed parse the middleware should
call next with error that includes appropriate status code and a message 
like "invalid json".

2. Add error handling middleware that handles sending error responses. Direct
all route errors to this handler. Errors should be consistent format and style.
Use http response status code to indicate error status, not the response body.

Testing:
* Existing e2e API tests should handle the addition of this middleware, though 
you may need to modify based on consistent error handling.

* Body-parser and error handler middleware should be united tested as pure functions.

## Rubric
  * Body Parser: 3pts
  * Error handler: 3pts
  * Code quality and organization: 2pts
  * Testing: 2pts
