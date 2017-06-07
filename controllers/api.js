'use strict';


const Twit = require('twit');
const jsonfile = require('jsonfile')
var _ = require('lodash');
 
const file = './data.json'



exports.getData = (req, res, next) => {
  //const token = req.user.tokens.find(token => token.kind === 'twitter');
  const T = new Twit({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token: process.env.accessToken,
    access_token_secret: process.env.tokenSecret
  });
  T.get('search/tweets', { q: 'nodejs since:2013-01-01', geocode: '40.71448,-74.00598,5mi', count: 10 }, (err, reply) => {
        if (err) { return next(err); }

        let usersIds = _.map(reply.statuses,(twit) => {
            return twit.user.id;
        })

        let follower = _.map(usersIds,(userId) => {
            T.get('followers/ids', { user_id: userId, count: 5}, (err,reply => {
                jsonfile.writeFile(file, reply.statuses, function (err) {
                    console.error(err)
                })
            }))
        })
    });
};