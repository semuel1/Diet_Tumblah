const router = require('express').Router()

router.get('/', require('../middleware/authenticateJWT'), (req, res) => {
    // console.log('The logged in user', res.locals.user)
    res.json({ 
        msg: "You've successfully accessed the auth locked resource",
    })
})

module.exports = router