const passport = require('passport')
const Strategy = require('passport-github2')
const User = require('../models/User')

passport.use(new Strategy({
    clientID: process.env['GITHUB_CLIENT_ID'],
    clientSecret: process.env['GITHUB_CLIENT_SECRET'],
    callbackURL: `/auth/github/callback`
},
    async function (accessToken, refreshToken, profile, cb) {
        const user = await User.findOne({
            provider: profile.provider,
            provider_id: profile.id
        })
        console.log('new user', user)
        if(!user) {
            const newUser = await User.create({
                provider: profile.provider,
                provider_id: profile.id,
                displayName: profile.username,
                name: {
                    givenName: profile.displayName,
                },
                photos: profile.photos
            })
            console.log('newuser', user)
            // We just created a user, return that user
            return cb(null, newUser)
        } else {
            // The user is already in the db
            return cb(null, user);
        }
    }
));

module.exports = passport