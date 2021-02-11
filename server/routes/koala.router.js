const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pg = require('pg');

const pool = new pg.Pool({
  database: 'koalas',
  host: 'localhost',
  port: 5432,
});

// GET
koalaRouter.get('/', (req, res) => {
  // pool === the DB connection
  pool
    .query(
      `
    -- selecting the entire koalas table
    SELECT * FROM "koala"
  `
    )
    .then(function (dbRes) {
      // GET back DB results
      res.send(dbRes.rows);
    })
    .catch(function (error) {
      console.log('error grabbing koala table', error);
      res.sendStatus(500);
    });
});

// POST
koalaRouter.post('/', (req, res) => {
  console.log('req.body', req.body);

  let sqlText = `
      INSERT INTO "koala"
        ("name", "gender", "age", "ready_to_transfer", "notes")
      VALUES
        -- using placeholder to prevent SQL Injection
        ($1, $2, $3, $4, $5,);
  `;

  let queryArgs = [
    req.body.name,
    req.body.body,
    req.body.gender,
    req.body.ready_to_transfer,
    req.body.notes,
  ];

  pool
    .query(sqlText, queryArgs)

    .then(function (dbRes) {
      res.sendStatus(201);
    })
    .catch(function (error) {
      console.log('error adding Koala', error);
      res.sendStatus(500);
    });
});

// PUT
koalaRouter.put('/:id', (req, res) => {
  let koalaId = req.params.id;

  // change to yes or no

  let readyForTransfer = req.body.ready_to_transfer;

  if (readyForTransfer === 'Y') {
    sqlText = `UPDATE "koala" SET "ready_to_transfer"=Y WHERE "id"=$1`;
  } else if (readyForTransfer === 'N') {
    sqlText = `UPDATE "koala" SET "ready_to_transfer"=N WHERE "id"=$1`;
  } else {
    // send back a response
    res.sendStatus(500);
    return;
  }
});

// DELETE -stretch goal

module.exports = koalaRouter;
