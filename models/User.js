// http://www.passportjs.org/docs/profile/
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    // Where the user authenticated from (Google, Github)
    provider: {
        type: String,
    },
    // The provider's id
    provider_id: {
        type: String,
    },
    displayName: {
        type: String,
        required: true
    },
    name: {
        familyName: String,
        givenName: String,
        middleName: String
    },
    photos: [{
        value: String
    }],
}, {
    timestamps: true
})

module.exports = User = mongoose.model('user', UserSchema)