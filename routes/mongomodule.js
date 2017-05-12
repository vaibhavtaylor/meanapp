var mongoModule = {};
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://vaibhavtaylor:root@ds123381.mlab.com:23381/userdata';

mongoModule.getUserData = function (collection, callback) {
    mongo.connect(url, function (err, db) {
        console.log(collection);
        var docs = [];
        var stream = db.collection(collection).find().stream();
        stream.on('data', function (doc) {
            // console.log(doc);
            docs.push(doc);
            // db.close();
        });
        stream.on('error', function (err) {
            console.log(err);
            db.close();
        });
        stream.on('end', function () {
            console.log('All done!');
            callback(docs);
            db.close();
        });
    });
}

mongoModule.addUser = function(collection, username, callback){
    mongo.connect(url, function(err, db) {
        db.collection(collection).insertOne( {
            "username": username
        });

        db.close();

        callback("New Value Added");
    });
}

mongoModule.deleteUser = function(collection, username, callback) {
    mongo.connect(url, function(err, db){
        db.collection(collection).deleteOne({
            "username": username
        }, function(err, results) {
        //  console.log(results);
      })

        db.close();

        callback("Entry Removed");
    })
}

mongoModule.updateData = function(collection, username, age, callback) {
    mongo.connect(url, function(err, db){
        db.collection(collection).update(
            {"username": username}, 
            {
                $set: {
                    "age" : age
                }
            }
        )

        db.close();

        callback("Entry Updated");
    })
} 

module.exports.mongoModule = mongoModule;