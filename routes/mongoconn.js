var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://vaibhavtaylor:root@ds123381.mlab.com:23381/userdata';

/* GET connection to mongo server. */
router.get('/', function(req, res, next) {    
    mongo.connect(url, function(err, db) {
        // assert.equal(null, err);
        console.log("Connected correctly to server.");
        db.close();
        res.send("Connected to Server");
    });
});

/*
GET collection from mongodb server
*/
router.get('/getcoll/:coll', function(req, res, next) {
    mongo.connect(url, function(err, db) {
        console.log(req.params.coll);
        var docs = "hello ";
        var cursor = db.collection(req.params.coll).find();
        cursor.each(function(err, doc){

            if(err) console.log(err);

            if(doc != null)
            {
                docs += doc.username + " \n";
                console.log(docs);
            }
            else {
                res.send(docs);
            }
        })
        
        db.close();
    });
});

/*
Insert an entry in mongodb server
*/
router.get('/add/:username', function(req, res, next){

    mongo.connect(url, function(err, db) {
        db.collection('users').insertOne( {
            "username": req.params.username
        });

        db.close();

        res.send("New Value Added");
    });

});

module.exports = router;