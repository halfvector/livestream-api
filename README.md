### API Contract
A single Directors resource endpoint with success and error http status codes
* GET /directors - list all director (200)
* POST /directors - create new director (200, 400, 409)
* PUT /directors/:director_id - update one director (200, 400, 404)
* GET /directors/:director_id - get one director (200, 400, 404)
* DELETE /directors/:director_id - delete one director (200, 400, 404)

### Setup local Node environment
`npm install` - Install all runtime and development dependencies

### Setup local MySQL instance

Ensure `app/configuration.js` username and password matches your db credentials.

Create database catalogs for isolated local development and running automated tests:

```
mysql -uroot -e "create database livestream_api_localhost"
mysql -uroot -e "create database livestream_api_testing"
```

### Run API server
`npm start` - Run the API server (defaults to port 9000)  
`gulp` - Run and auto-restart server when changes are detected  

### Run automated tests
`npm test` - Run tests once  
`mocha -w` - Rerun tests whenever changes are detected  

### Manual testing using Postman
Download Postman collection: https://www.getpostman.com/collections/fbb913712bde3a2878e7
