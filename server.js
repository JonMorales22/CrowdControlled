const express = require('express');
const app = new express();
const path = require('path');

app.use(express.static(__dirname + "/build"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

var port = 3000;
app.listen(port, console.log(`now listening on port:${port}`));