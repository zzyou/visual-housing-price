const express = require("express");

const app = express();
const port = process.env.PORTNUM || 4000;

// cannot use route '/data', seems to be a reserved word?
app.get('/hello', (req, res) => {
    res.send({express: "Hello from express!"});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
