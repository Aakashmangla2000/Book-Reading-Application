<h1 align="center">
Book Reading App
</h1>
<p align="center">
PostgreSQL, Express, React, NodeJS, TypeScript
</p>

<!-- > PERN is a fullstack implementation in PostgreSQL, Express, React, NodeJS. -->

## clone or download

```terminal
$ gh repo clone Aakashmangla2000/Book-Reading-Application
```

## project structure

```terminal
server/
client/
```

# Usage (run fullstack app on your machine)

## Prerequisites

- [PostgreSQL](https://www.postgresql.org/download/)
- [Node](https://nodejs.org/en/download/)
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)

```terminal
$ cd client          // go to client folder
$ npm i             // npm install packages
$ npm start         // run it locally
```

## Server-side usage(PORT: 3001)

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start   // run it locally
```

## Database setup (PSQL)

```terminal
$ psql --username=postgres
postgres=# create database library;
postgres=# \q
$ cd server/db
$ psql --username=postgres library < library.sql
```

you might need to change the user details of database in db/index.ts

## Author

[Aakashmangla2000](https://aakashmangla.web.app/)
