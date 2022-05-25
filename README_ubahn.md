# LOFINO Programming Task

Welcome to the LOFINO Full Stack Programming Task! Your task is to complete a small Express/React application concerned with Berlins subway network.

## Introduction

Berlin has 9 subway `line`s (U1 to U9). Each of those stop at a number of `station`s and run from a starting station to an end station and back.

All of those lines have been assigned a unique _color_ for easy identification.

https://en.wikipedia.org/wiki/Berlin_U-Bahn

Your task is to complete the existing backend and frontend application to provide some basic navigation page for users.

## Prerequisites

- an installation of Node.js (>=14) and npm
- your favorite IDE
- a possibility to share the result, e.g Dropbox or Github

## Getting Started

### Backend

In the directory `backend_ubahn` you'll find a Node.js application with an Express server ready to be used.

```sh
# enter directory
cd backend_ubahn

# install node modules
npm ci

# run server
npm start
```

To check if the server works, you can query a dummy endpoint:

```sh
curl http://localhost:8080/hello
# -> Hello World"
```

In `src/data/lines.json` you'll find the definition of the sample data. You can access this by importing `lines` from `src/data`. You may want to postprocess the data in some way.

There's a function `src/domain/getNextStops` that you should implement, see the corresponding tests in the `__tests__` directory.

### Frontend

```sh
# enter directory
cd frontend_ubahn

# install node modules
npm ci

# run server and bundler
npm start
```

Open `http://localhost:3000/` in your web browser. It should show a welcome message and fetched data from the backend.

## Backend Tasks

Your task is to serve HTTP routes that answer a couple of questions for the line network:

- given a `line` that is passed with a GET request, which stations are served by the line?
- given a `line` that is passed with a GET request and a `station` belonging to the line, what are the next N stops relative to the passed station?
  - a value for N can be passed optionally via the route. Default: 3
  - a value for the `direction` can be optionally passed via the route. See `src/domain/getNextStops.ts`. Default: `forward`
- given a `line` and a `station` that are passed with a GET request, which other lines are accessible at that station?
- [*only for backend focused assignment*] given two `station`s, how can a passenger navigate from the first station to the second station?
  - see the `getRoute()` function for further explanation and tests
  - any valid route suffices, you don't need to optimize for distance etc.
- implement the functionality in the corresponding functions in the `src/domain/` folder and make sure any corresponding tests in the `src/domain/__tests__` directory pass by running `npm run test`.

## Frontend Tasks

Your task here is to provide an interactive React application that queries the backend and presents the results to the user.

- fetch line infos via backend route `GET /lines`
- provide a possibility to the user to select one of those lines
- once selected, list the stations of that line
- [*optional for backend focused assignment*] the stations are selectable. When selecting a station:
  - fetch the accessible lines for that station from the backend and display them
  - color the background of the station names according to their colors (see [here](<https://en.wikipedia.org/wiki/U5_(Berlin_U-Bahn)>) for examples)
  - query the backend for the next `3` stops and show them to the user.

For an example on how the frontend could look like, refer to [this rough scetch](frontend_ubahn/example/frontend-example.png).

## Notes

- Feel free to use third party modules where appropriate. You may also change the structure of the files the way you think is appropriate.
- Some of the software structure is not great. Feel free to refactor existing modules as you please.
- You may also change the signature of the domain functions to pass in more appropriate data structures
- There are tests for the backend part. Make sure they pass. Feel free to extend the tests where appropriate.
  - to run the tests, run `npm run test-watch` in the backend.
- Focus on code quality and working software, try to follow best practices. Treat the final version of your solution like the first MR you open at a new company.
- Keep an eye on security, usability etc.
- Feel free to add comments on the code if you want to explain something or on a place that could be improved
  - you can also add comments on the bottom of this document

## Your Notes

Here you can add your own notes and comments about the project.
For example, what trade offs did you have to decide for? What would you have done differently if you had more time?
What did you think of the tasks? Was it too much / too easy / too ambiguous?

Algorithm of Dijkstra is used to find the path between the stations assuming that the distance is equal between the stations.
The data graph.json indicates the nodes and edges of the stations and getGraph.ts shows a function which produced the data.
The getRoute.ts uses data graph.json for the function to work faster, but could also use getGraph.ts if the lines data was updated.

The original test of getRoute.test.ts, which indicates that getPath.ts works when switching lines, should have a length of 3 instead of the length of 2 because the return array in this test indicates 3 elements. This test also has other right answers because the route with a path from the Kochstraße to the Yorckstraße has 2 ways, that is, the one in the original test and the one with a switch at Hallesches Tor and with a switch at Möckernbrücke with the same distances. According to the task any of the routes could be returned. Therefore, this test was updated to have a length of 4 and to have the indicated switch stations because this path is returned by the function and it is also a working path. 

There are also APIs in the backend which return the data of lines with types and stations according to the tests while only stations and colors are used in the frontend. This was done in this way because tests specify that lines have to have this data, but this has to be clarified and adjusted if necessary. Cyclical lines for getNextStops are to be implemented during the interview according to the tests.

For the optional frontend task, it is said to color stations according to their colors, but an example link shows colored lines and an example image shows colored lines too, therefore, it is assumed that lines had to be colored.

The task could be improved by calculating time between the stations for a route and making a better graphical design which was coded according to the provided example.

The level of the task is appropriate.

There is a bonus functionality which shows allows users to type stations and see a route.
