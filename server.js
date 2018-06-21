const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/states/alldata", (req, res) => {
  const connection = process.env.DB_CONNECTION.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  connection.connect();

  const dataQuery =
    "SELECT level, place_name, place_id, index_nsa, yr FROM HPIyear WHERE level = ? OR level = ? ORDER BY index_nsa";

  connection.query(dataQuery, ["MSA", "State"], function(error, result, field) {
    if (error) {
      console.error(error.toString());
    } else {
      const data = JSON.stringify(result);
      return res.send(data);
    }
  });

  connection.end();
});

app.get("/user/:email", (req, res) => {
  const connection = process.env.DB_CONNECTION.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  connection.connect();

  const preferenceQuery =
    "SELECT year, state, level FROM users WHERE email = ? ORDER BY id DESC LIMIT 1";
  const email = req.params.email;

  connection.query(preferenceQuery, email, function(error, result, field) {
    if (error) {
      console.error(error.toString());
    } else {
      const data = JSON.stringify(result);
      return res.send(data);
    }
  });

  connection.end();
});

app.post("/save_user", (req, res) => {
  const connection = process.env.DB_CONNECTION.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  connection.connect();

  const userQuery = "INSERT INTO users SET ?";
  const userInfo = {
    name: req.body.name,
    email: req.body.email,
    year: req.body.year,
    state: req.body.state,
    level: req.body.level
  };

  connection.query(userQuery, userInfo, function(error, result, field) {
    if (error) {
      console.error(error.toString());
    } else {
      return res.send(JSON.stringify("User saved to database"));
    }
  });

  connection.end();
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
