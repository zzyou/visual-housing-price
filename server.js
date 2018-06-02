const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const Auth0Strategy = require('passport-auth0');
const mysql = require('mysql');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

const reactPort = process.env.REACT_PORT || 4000;
const mysqlPort = process.env.MYSQL_PORT || 3306;

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'finalProject'
});

const mysqlConnect = (getData) => {
    connection.connect((err) => {
        if (err) throw err;        
        getData(() => connection.end());
    })
};

// passport.use('auth0', new Auth0Strategy(
//     {
//         domain: process.env.AUTH0_DOMAIN,
//         clientID: process.env.AUTH0_CLIENT_ID,
//         clientSecret: process.env.AUTH0_SECRET,
//         callbackURL: '/api/auth/callback'
//     }, (accessToken, refreshToken, params, user, done) => {
//         // save user to database?
//         return done(null, user);
//     }
// ));

// passport.serializeUser((user, done) => {
//     return done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     return done(null, user);
// });


app.get('/states/alldata', (req, res) => {
    const sqlQuery = 'SELECT level, place_name, place_id, index_nsa, yr FROM HPIyear WHERE level = ? OR level = ? ORDER BY index_nsa';
    mysqlConnect((closeConnection) => {
        connection.query(sqlQuery, ['MSA', 'State'], function(error, result, field) {
            if (error) throw error;
            const data = JSON.parse(JSON.stringify(result));
            return res.send(data);
        })
        closeConnection();
    })
});

// app.get('/states/:level', (req, res) => {
//     const level = req.params.level;
//     const sqlQuery = 'SELECT place_id, index_nsa, yr FROM HPIyear WHERE level = ? ORDER BY index_nsa';
//     mysqlConnect((closeConnection) => {
//         connection.query(sqlQuery, [level], function(error, result, field) {
//             if (error) throw error;
//             const data = JSON.parse(JSON.stringify(result));
//             return res.send(data);
//         })
//         closeConnection();
//     })
// });

// // cannot use route '/data', seems to be a reserved word?
// app.get('/states/:level/:stateName', (req, res) => {
//     const level = req.params.level;
//     const stateName = req.params.stateName;
//     const nameQuery = `, %${stateName}%`;
//     const sqlQuery = 'SELECT place_name, place_id, index_nsa, yr FROM HPIyear WHERE level = ? AND place_name =? ORDER BY index_nsa';
//     mysqlConnect((closeConnection) => {
//         connection.query(sqlQuery, [level, nameQuery], function(error, result, field) {
//             if (error) throw error;
//             const data = JSON.parse(JSON.stringify(result));
//             return res.send(data);
//         })
//         closeConnection();
//     })
// });

// app.get('/states/:state/:year', (req, res) => {
//     const stateName = req.params.state;
//     const year = req.params.year;
//     const sqlQuery = `SELECT place_name, index_nsa FROM HPIyear WHERE level = 'MSA' AND place_name LIKE ? AND yr = ? ORDER BY index_nsa`;
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
