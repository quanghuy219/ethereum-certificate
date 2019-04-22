var express = require('express');
var ethereum = require('./ethereum');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.json());
// index page 
app.get('/', (req, res) => {
    res.render('pages/index');
});

app.post('/save', (req, res, next) => {
    ethereum.storeData(req.body)
        .then(txHash => {
            console.log(txHash)
            console.log(req.body)
            return res.render('pages/save');
        })
})

app.listen(8080);
