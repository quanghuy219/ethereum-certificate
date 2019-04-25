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
                certificates = [{
                    ...certificate,
                    createdAt: result.dataValues.createdAt,
                    txhash: result.dataValues.txhash
                }]
                return res.render('pages/result', { certificates });
            })
        })
        .catch(err => {
            console.log(err)
        })
})

app.post('/search', (req, res, next) => {
    db.Transaction.findAll({
        where: {
            studentID: req.body.studentID
        }
    })
    .then(transactions => {
        return Promise.all(transactions.map(tx => {
            const txhash = tx.dataValues.txhash
            return ethereum.retrivedata(txhash)
                .then(data => {
                    return {
                        ...data,
                        txhash: tx.txhash,
                        createdAt: tx.createdAt
                    }
                })
        }))
    })
    .then(certificates => {
        return res.render('pages/result', { certificates });
    })
})

app.listen(8080);
