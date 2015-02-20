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
        var query = JSON.parse(argv.query),
            sample = db.collection(argv.collection);
        sample.find(query, {
            fields: JSON.parse(argv.fields)
        }, function (e, curs) {
            if (e) {
                exceptions.push(e);
            }
            if (curs) {
                curs.each(function (e, doc) {
                    if (e) {
                        exceptions.push(e);
                        console.error(JSON.stringify(exceptions));
                        process.exit();
                    }
                    if (doc) {
                        if (keys.length > 1) {
                            console.log(JSON.stringify(doc));
                        } else {
                            if (doc[keys[0]]) {
                                console.log(JSON.stringify(doc[keys[0]]));
                            }
                        }
                    } else {
                        process.exit();
                    }
                });
            }
        });
    }
});
