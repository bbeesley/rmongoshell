/*jslint browser: true, devel: true, node: true, eqeq: true, forin: true, nomen: true, plusplus: true, regexp: true, sloppy: true, indent: 4*/
var MongoClient = require('mongodb').MongoClient,
    db,
    sample,
    response,
    exceptions = [],
    argv = require('yargs').usage('Usage: $0 --host [string] --db [string] --collection [string]').demand(['host', 'db', 'collection']).argv;
MongoClient.connect('mongodb://' + argv.host + '/' + argv.db, function (err, db) {
    'use strict';
    if (err) {
        console.error(err.message);
    }
    if (db) {
        var sample = db.collection(argv.collection),
            summary = sample.aggregate(
            [{
                $match: {
                    "bonus": {
                        $exists: 1
                        }
                        }
            }, {
                $project: {
                                "value": 1,
                                "bonus.multiplier": 1
                            }
            }, {
                $group: {
                                "_id": {
                                    "stake": "$value",
                                    "mult": "$bonus.multiplier"
                                },
                                "count": {
                                    $sum: 1
                                }
                            }
            }, {
                $sort: {
                                "_id.stake": 1,
                                "_id.mult": 1
                            }
            }],
                function (error, results) {
                    if (error) {
                        console.error(error.message);
                    }
                    if (results) {
                        results.forEach(function (el, ind, ob) {
                            console.log(JSON.stringify(el));
                        });
                    }
                    process.exit();
                }
            );
    }
});
