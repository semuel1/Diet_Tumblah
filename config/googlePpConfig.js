// From the passport.js documentation for express-4.x-facebook-example
// https://github.com/passport/express-4.x-facebook-example/blob/master/server.js

const passport = require('passport')
const Strategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')

// Configure the Google strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Google API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: `/auth/google/callback`
},
    async function (accessToken, refreshToken, profile, cb) {
        // In this example, the user's Google profile is supplied as the user
        // record.  In a production-quality application, the Google profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        const user = await User.findOne({
            provider: profile.provider,
            provider_id: profile.id
        })
        console.log('user', user)
        if(!user) {
            const newUser = await User.create({
                provider: profile.provider,
                provider_id: profile.id,
                displayName: profile.displayName,
                name: {
                    familyName: profile.name.familyName,
                    givenName: profile.name.givenName,
                    middleName: profile.name.middleName
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