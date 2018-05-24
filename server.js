const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const keys = require("./keys");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const reactPort = process.env.REACT_PORT || 4000;
const mysqlPort = process.env.MYSQL_PORT || 3306;

const connection = mysql.createConnection({
    host: keys.dbHost,
    port: mysqlPort,
    user: keys.dbUser,
    password: keys.dbPassword,
    database: keys.dbName
});

const mysqlConnect = (getData) => {
    connection.connect((err) => {
        if (err) throw err;        
        getData(() => connection.end());
    })
}

// cannot use route '/data', seems to be a reserved word?
app.get('/states/:year', (req, res) => {
    const year = req.params.year;
    const sqlQuery = "SELECT place_id, index_nsa FROM HPIyear WHERE level = 'State' AND yr = ?";
    mysqlConnect((closeConnection) => {
        connection.query(sqlQuery, [year], function(error, result, field) {
            if (error) throw error;
            const data = JSON.parse(JSON.stringify(result));
            return res.send(data);
        })
        closeConnection();
    })
});

app.listen(reactPort, () => {
    console.log(`Listening on port ${reactPort}.`);
});
