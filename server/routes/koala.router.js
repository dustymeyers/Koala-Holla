const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pg = require('pg');

const pool = new pg.Pool({
  database: 'koala_holla',
  host: 'localhost',
  port: 5432,
});

// GET
koalaRouter.get('/', (req, res) => {
  //console.log('trying to get');
  // pool === the DB connection
  pool
    .query(
      `
    -- selecting the entire koalas table
    SELECT * FROM "koala"
    ORDER BY "id"
  `
    )
    .then(function (dbRes) {
      //console.log(dbRes.rows);
      // GET back DB results
      res.send(dbRes.rows);
    })
    .catch(function (error) {
      console.log('error grabbing koala table', error);
      res.sendStatus(500);
    });
});

koalaRouter.post('/', (req, res) => {
  console.log('req.body', req.body);
  console.log('req transfer', req.body.ready_to_transfer);

  let sqlText = `
      INSERT INTO "koala"
        ("name", "gender", "age", "ready_to_transfer", "notes")
      VALUES
        -- using placeholder to prevent SQL Injection
        ($1, $2, $3, $4, $5);
  `;

  let queryArgs = [
    req.body.name,
    req.body.gender,
    req.body.age,
    req.body.ready_to_transfer,
    req.body.notes,
  ];

  pool
    .query(sqlText, queryArgs)
    .then(function (dbRes) {
      console.log('dbRes', dbRes);
      res.sendStatus(201);
    })
    .catch(function (error) {
      console.log('error adding Koala', error);
      res.sendStatus(500);
    });
});

// PUT
koalaRouter.put('/ready/:id', (req, res) => {
  let koalaId = req.params.id;
  let sqlText;

  // variable to store req.body return

  console.log('transferBoolean is ', req.body.transferBoolean);

  let yesOrNo = req.body.transferBoolean;

  if (yesOrNo == 'true') {
    sqlText = `UPDATE "koala" SET "ready_to_transfer"='Y' WHERE "id"=$1`;
  } else if (yesOrNo == 'false') {
    sqlText = `UPDATE "koala" SET "ready_to_transfer"='N' WHERE "id"=$1`;
  } else {
    // If we don't get an expected direction, send back bad status
    res.sendStatus(500);
    return; // Do it now, doesn't run the next set of code.
  }

  pool
    .query(sqlText, [koalaId])
    .then((resDB) => {
      console.log('resDB is ', resDB);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in PUT', error);
      res.sendStatus(500);
    });
});

// DELETE -stretch goal
koalaRouter.delete('/remove/:id', (req, res) => {
  console.log('in delete endpoint');
  let koalaId = req.params.id;

  let sqlText = 'DELETE FROM "koala" WHERE "id"=$1';

  pool
    .query(sqlText, [koalaId])
    .then((resDB) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error deleting koala', err);
      res.sendStatus(500);
    });
});

module.exports = koalaRouter;
