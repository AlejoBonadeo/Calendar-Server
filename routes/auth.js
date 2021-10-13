const express = require('express')
const { check } = require('express-validator')
const { createUser, renewToken, loginUser } = require('../controllers/auth')
const validateForm = require('../middlewares/validateForm')
const validateJWT = require('../middlewares/validateJWT')

const router = express.Router()


router.post(
    '/',
    [
        check('email', 'Please send a valid email').isEmail(),
        check('password', 'Password must be at least 7 characters').isLength({min: 6}),
        validateForm()
    ],
    loginUser
)

router.post(
    '/new', 
    [ 
        check('name', 'Please send a name').not().isEmpty(),
        check('email', 'Please send a valid email').isEmail(),
        check('password', 'Password must be at least 7 characters').isLength({min: 6}),
        validateForm()
    ],
    createUser
)

router.get('/renew', validateJWT, renewToken)

module.exports = router