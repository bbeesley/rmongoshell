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
        db.authenticate('bill', 'test1234', function (e, ok) {
            if (e) {
                console.error(e.message);
            }
            if (ok) {
                var sample = db.collection(argv.collection),
                    summary = sample.aggregate(
                        [{
                                $project: {
                                    "reelSetIx": 1,
                                    "state.lastStake": 1,
                                    "winLines": 1
                                }
                        },
                            {
                                $unwind: "$winLines"
                        },
                            {
                                $project: {
                                    "reelSetIx": 1,
                                    "state.lastStake": 1,
                                    "winLines.symbol": 1,
                                    "winLines.length": {
                                        $add: [2, {
                                            $size: "$winLines.BigWinAmount.c"
                                        }]
                                    }
                                }
                         },
                            {
                                $group: {
                                    "_id": {
                                        "stake": "$state.lastStake",
                                        "reelSet": "$reelSetIx",
                                        "winSym": "$winLines.symbol",
                                        "winLength": "$winLines.length"
                                    },
                                    "count": {
                                        $sum: 1
                                    }
                                }
                         }], function (error, results) {
                            if (error) {
                                console.error(error.message);
                            }
                            if (results) {
                                results.forEach(function (el, ind, ob) {
                                    console.log(JSON.stringify(el));
                                });
                            }
                            process.exit();
                        });

            }
        });
    }
});