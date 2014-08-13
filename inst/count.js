/*jslint node: true, eqeq: true, plusplus: true, regexp: true, indent: 4 */
var MongoClient = require('mongodb').MongoClient,
    db,
    sample,
    response,
    exceptions = [],
    argv = require('yargs').usage('Usage: $0 --host [string] --db [string] --collection [string] --query [string]').demand(['host', 'db', 'collection', 'query']).argv;
// console.log('Got ' + argv.host + ' for host');
// console.log('Got ' + argv.db + ' for db');
// console.log('Got ' + argv.collection + ' for collection');
// console.log('Got ' + argv.query + ' for query');
MongoClient.connect('mongodb://' + argv.host + '/' + argv.db, function (err, db) {
    'use strict';
    if (err) {
        exceptions.push(err);
    }
    if (db) {
        db.authenticate('bill', 'test1234', function (e, ok) {
            if (e) {
                exceptions.push(e);
            }
            if (ok) {
                sample = db.collection(argv.collection);
                sample.count(JSON.parse(argv.query), function (e, dat) {
                    if (e) {
                        console.error(e.message);
                        process.exit();
                    }
                    if (dat) {
                        console.log(JSON.stringify(dat));
                        process.exit();
                    }
                });
            }
        });
    }
});
