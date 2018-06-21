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

const port = process.env.PORT || 4000;
const mysqlPort = process.env.MYSQL_PORT || 3306;

app.get("/states/alldata", (req, res) => {
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "finalProject"
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

app.get("/user/:name", (req, res) => {
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "finalProject"
  });

  connection.connect();

  const preferenceQuery =
    "SELECT year, state FROM users WHERE name = ? ORDER BY id DESC";
  const name = req.params.name;

  connection.query(preferenceQuery, name, function(error, result, field) {
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
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "finalProject"
  });

  connection.connect();

  const userQuery = "INSERT INTO users SET ?";
  const userInfo = {
    name: req.body.name,
    email: req.body.email,
    year: req.body.year,
    state: req.body.state
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

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
