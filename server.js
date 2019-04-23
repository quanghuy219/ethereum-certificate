const express = require('express');
const ethereum = require('./ethereum');
const db = require('./db');
const app = express();

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
            certificate = req.body
            db.Transaction.create({
                studentID: certificate.studentID,
                txhash: txHash
            }).then(result => {
                return res.render('pages/save', {certificate, txHash, transaction: result.dataValues});
            })
        })
        .catch(err => {
            console.log(err)
        })
})

app.listen(8080);
