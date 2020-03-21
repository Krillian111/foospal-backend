## Installation

### Locally without docker
- install mongodb
- install npm
- start mongodb with `sudo systemctl start mongod`
- install depdencies with `npm install`
- (optional) adjust port and database url through env variables `PORT` and `DB_URL`, see defaults in /config/config.js
- start the server with `nodemon` or `npm start`
- start querying data, e.g. `curl http://localhost:3000/api/singles`

### Using docker

- install docker
- run `docker-compose up`
- start querying data, e.g. `curl http://localhost:3000/api/singles`