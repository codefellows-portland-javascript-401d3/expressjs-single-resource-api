# Change log
All notable changes to this project will be documented in this file

## 3.4.0 - 2016-07-31
Added
- Two new GET methods
  - retrieve count of notes by a specific author   
  - retrieve title and body for every note written by a specific author

## 3.3.0 - 2016-07-30
Added
- Parent child relationship between Author(parent) and Notes(children)
- PUT and DELETE api calls to add/remove relationships

## 3.2.0 - 2016-07-29
Changed
- User model changed Authors to prep for future releases that include user login/management

## 3.1.0 - 2016-07-28
Added
- Non CRUD endpoint query that returns notes marked as important
- CRUD endpoints for /api/users

## 3.0.0 - 2016-07-27
Added
- Mongo DB stores objects
- Mongoose commands to query the database

## 2.1.0 - 2016-07-26
Added
- Middleware for error handling
- Middleware for incoming JSON data on PUT and POST requests
- Routes separated from the main app

## 2.0.0 - 2016-07-25
Added
- POST, PUT, DELETE options

Changed
- response is written in JSON instead of plain text

Deprecated
- Vanilla routing for express routing

## 1.1.0 - 2016-07-23
Added
- GET options for /books and /books/:id

Changed
- Server routes requests/responses only
- DB handles data only

Fixed
- Error handling


## 1.0.0 - 2016-07-20
Added
- GET options for /notes and /notes/:id
