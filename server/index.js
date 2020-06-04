var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());


app.get('/', function(req, res) {
    res.send({ data: Math.floor(Math.random() * (70 - 1) + 1), code: 200, error: false });
    //res.send({ data: Math.floor(85), code: 200, error: false });

});

app.listen(3000, function() {
    console.log('API inicializada en el puerto 3000');
});