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
                    $unwind: "$winLines"
                }, {
                    $project: {
                        "value": 1,
                        "winLines.symbol": 1,
                        "winLines.length": 1
                    }
                }, {
                    $group: {
                        "_id": {
                            "stake": "$value",
                            "winSym": "$winLines.symbol",
                            "winMult": "$winLines.length"
                        },
                        "count": {
                            $sum: 1
                        }
                    }
                }, {
                    $sort: {
                        "_id.stake": 1,
                        "_id.winSym": 1,
                        "_id.winMult": 1
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
