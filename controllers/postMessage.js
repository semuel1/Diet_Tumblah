const router = require('express').Router()

router.get('/', require('../middleware/authenticateJWT'), (req, res) => {
    // console.log('The logged in user', res.locals.user)
    res.json({ 
        msg: "You've successfully accessed the auth locked resource",
    })
})

router.post('/' , async (req, res) => {
    
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })
    try {   
        await newPostMessage.save();
        res.status(200).json(newPostMessage );
        
    } catch (error) {
        res.status(300).json({ message: error.message });
    }
})


module.exports = router