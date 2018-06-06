const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const reactPort = process.env.REACT_PORT || 4000;
const mysqlPort = process.env.MYSQL_PORT || 3306;

app.get('/states/alldata', (req, res) => {
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'finalProject'
    });

    connection.connect();

    const sqlQuery = 'SELECT level, place_name, place_id, index_nsa, yr FROM HPIyear WHERE level = ? OR level = ? ORDER BY index_nsa';

    connection.query(sqlQuery, ['MSA', 'State'], function(error, result, field) {
        if (error) {
            console.error(error.toString());
        } else {
            const data = JSON.parse(JSON.stringify(result));
            return res.send(data);
        }
    });

    connection.end();
});

app.listen(reactPort, () => {
    console.log(`Listening on port ${reactPort}.`);
});
