/*jslint browser: true, devel: true, node: true, eqeq: true, forin: true, nomen: true, plusplus: true, regexp: true, sloppy: true, indent: 4*/
var MongoClient = require('mongodb').MongoClient,
    db,
    sample,
    response,
    exceptions = [],
    argv = require('yargs').usage('Usage: $0 --host [string] --db [string] --collection [string] --stakeKey [string] --winKey [string] --numLines [integer]').demand(['host', 'db', 'collection', 'stakeKey', 'winKey', 'numLines']).argv,
    stake = '$' + argv.stakeKey,
    win = '$' + argv.winKey,
    lines = parseInt(argv.numLines, 10);
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
                            $group: {
                                _id: stake,
                                sampleSize: {
                                    $sum: {
                                        $cond: {
                                            if: "$wasFree",
                                            then: 0,
                                            else: 1
                                        }
                                    }
                                },
                                totalStaked: {
                                    $sum: {
                                        $multiply: [lines, stake]
                                    }
                                },
                                totalWon: {
                                    $sum: win
                                }
                            }
                        }, {
                            $project: {
                                sampleSize: "$sampleSize",
                                totalStaked: "$totalStaked",
                                totalWon: "$totalWon",
                                RTP: {
                                    $divide: ["$totalWon", {
                                        $cond: {
                                            if :{
                                            $gt: ["$totalStaked", 0]
                                        },
                                        then: "$totalStaked",
                                        else : 1
                                    }
                                              }]
                                }
                            }
                        }], function(error, results) {
                            if (error) {
                                console.error(error.message);
                            }
                            if (results) {
                                results.forEach(function(el, ind, ob) {
                                    console.log(JSON.stringify(el));
                                });
                            }
                            process.exit();
                        });

            }
        });
    }
});
