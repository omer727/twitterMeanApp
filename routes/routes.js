var Tweet = require('../app/models/tweet');
var express = require('express')
module.exports = function (app) {



    // create a tweet (accessed at POST http://localhost:8080/api/tweets)
    var routeCollection = app.route('/api/tweets');
    routeCollection.post(function (req, res) {

        var tweet = new Tweet();      // create a new instance of the Bear model
        tweet.message = req.body.message;  // set the tweets message (comes from the request)
        tweet.author = req.body.author;   // set the tweets author (comes from the request)

        // save the tweet and check for errors
        tweet.save(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({message: 'Tweet created!'});
            }
        });

    })
        .get(function (req, res) {
            Tweet.find({}, {__v: 0}, function (err, tweets) {
                if (err) res.send(err);
                res.json(tweets)
            });

        });

// on routes that end in /tweets/:tweet_id
// ----------------------------------------------------
    var routeSingle = app.route('/api/tweets/:tweet_id')
    // get the tweet with that id (accessed at GET http://localhost:8080/api/tweets/:tweet_id)
    routeSingle.get(function (req, res) {
        Tweet.findById(req.params.tweet_id, function (err, tweet) {
            if (err)
                res.send(err);
            res.json(tweet);
        });
    })
    // update the tweet with this id (accessed at PUT http://localhost:8080/api/tweets/:tweet_id)
        .put(function (req, res) {

            // use our tweet model to find the tweet we want
            Tweet.findById(req.params.tweet_id, function (err, tweet) {

                if (err)
                    res.send(err);

                if (req.body.message)
                    tweet.message = req.body.message;  // update the tweets info
                if (req.body.author)
                    tweet.author = req.body.author;  // update the tweets info

                // save the tweet
                tweet.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'Tweet updated!'});
                });

            });
        });

    // delete the tweet with this id (accessed at DELETE http://localhost:8080/api/tweets/:tweet_id)
    .
    delete(function (req, res) {
        Tweet.remove({
            _id: req.params.tweet_id
        }, function (err, tweet) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
    });


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    app.get('/api', function (req, res) {
        res.json({message: 'hooray! welcome to our api!'});
    });

}