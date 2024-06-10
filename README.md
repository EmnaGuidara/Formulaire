# Form Collection Node/Express Server 

## Description
This is a simple form collection server that uses Node.js and Express.js to collect form data and store it in a Mongo DB.
the optimal case would be to store the data for each client according to the referrer URL and link it to the client, but for the sake of simplicity,  we'll store all the data in the same collection.

## Goals
- Collect form data
- Store form data in a MongoDB database
- Retrieve form data from the database
- Display form data in a table


## Installation
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a copy from the`.env.template` file in the root directory and name it `.env` and add the following variables:
    - `PORT` : The port number for the server
    - `MONGO_URI` : The URI for the MongoDB database


## Contributors
- [Emna Guidara](https://github.com/EmnaGuidara)