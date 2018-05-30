const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const reactPort = process.env.REACT_PORT || 4000;
const mysqlPort = process.env.MYSQL_PORT || 3306;

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "finalProject"
});

const mysqlConnect = (getData) => {
    connection.connect((err) => {
        if (err) throw err;        
        getData(() => connection.end());
    })
};

app.get('/states/:level', (req, res) => {
    const level = req.params.level;
    const sqlQuery = "SELECT place_id, index_nsa, yr FROM HPIyear WHERE level = ?";
    mysqlConnect((closeConnection) => {
        connection.query(sqlQuery, [level], function(error, result, field) {
            if (error) throw error;
            const data = JSON.parse(JSON.stringify(result));
            return res.send(data);
        })
        closeConnection();
    })
});

// cannot use route '/data', seems to be a reserved word?
app.get('/states/:level/:year', (req, res) => {
    const level = req.params.level;
    const year = req.params.year;
    const sqlQuery = "SELECT place_id, index_nsa FROM HPIyear WHERE level = ? AND yr = ?";
    mysqlConnect((closeConnection) => {
        connection.query(sqlQuery, [level, year], function(error, result, field) {
            if (error) throw error;
            const data = JSON.parse(JSON.stringify(result));
            return res.send(data);
        })
        closeConnection();
    })
});

// app.get('/states/:state/:year', (req, res) => {
//     const stateName = req.params.state;
//     const year = req.params.year;
//     const sqlQuery = `SELECT place_name, index_nsa FROM HPIyear WHERE level = 'MSA' AND place_name LIKE ? AND yr = ?`;
//     mysqlConnect((closeConnection) => {
//         connection.query(sqlQuery, [`%, ${stateName}%`, year], function(error, result, field) {
//             if (error) throw error;
//             const data = JSON.parse(JSON.stringify(result));
//             return res.send(data);
//         })
//         closeConnection();
//     })
// });

app.listen(reactPort, () => {
    console.log(`Listening on port ${reactPort}.`);
});
