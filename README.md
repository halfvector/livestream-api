### Setup local MySQL instance

Ensure `app/configuration.js` username and password matches your db credentials.

Create database catalogs for isolated local development and running automated tests:

```
mysql -uroot -e "create database livestream_api_localhost"
mysql -uroot -e "create database livestream_api_testing"
```