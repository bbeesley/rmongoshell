/*jslint node: true, eqeq: true, plusplus: true, regexp: true, indent: 4 */
/*jslint node: true, eqeq: true, plusplus: true, regexp: true, indent: 4 */
var MongoClient = require('mongodb').MongoClient,
    db,
    sample,
    response,
    exceptions = [],
    argv = require('yargs').usage('Usage: $0 --host [string] --db [string] --collection [string] --query [json] --fields [json]').demand(['host', 'db', 'collection', 'query', 'fields']).argv,
    keys = Object.keys(JSON.parse(argv.fields));
// console.log('Got ' + argv.host + ' for host');
// console.log('Got ' + argv.db + ' for db');
// console.log('Got ' + argv.collection + ' for collection');
// console.log('Got ' + argv.property + ' for property');
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
                var query = JSON.parse(argv.query),
                    sample = db.collection(argv.collection);
                sample.find(query, {
                    fields: JSON.parse(argv.fields)
                }, function (e, curs) {
                    if (e) {
                        exceptions.push(e);
                    }
                    if (curs) {
                        curs.toArray(function (e, arr) {
                            if (e) {
                                exceptions.push(e);
                            }
                            if (arr && keys.length > 1) {
                                arr.forEach(function (e, i, o) {
                                    console.log(JSON.stringify(e));
                                });
                                process.exit();
                            } else {
                                arr.forEach(function (e, i, o) {
                                    console.log(JSON.stringify(e[keys[0]]));
                                });
                                process.exit();
                            }
                        });
                    }
                });
            }
        });
    }
});
