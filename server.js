const express = require("express");
const mysql = require("mysql");
const keys = require("./keys");

const app = express();

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
app.get('/states/2017', (req, res) => {
    // res.send({express: "Hello from express!"});
    const sqlQuery = "select place_id, index_nsa from HPIyear where level = 'State' and yr = 2017";
    mysqlConnect((closeConnection) => {
        connection.query(sqlQuery, function(error, result, field) {
            if (error) throw error;
            const data = JSON.parse(JSON.stringify(result));
            res.send({data: data});
        })
        closeConnection();
    })
});

app.listen(reactPort, () => {
    console.log(`Listening on port ${reactPort}.`);
});
