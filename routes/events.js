const express = require('express')
const { check } = require('express-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const isDate = require('../helpers/isDate')
const validateForm = require('../middlewares/validateForm')
const validateJWT = require('../middlewares/validateJWT')
const router = express.Router()

router.use( validateJWT )

router.get('/', getEvents)

router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        validateForm()
    ],
    createEvent
)

router.put(
    '/:id',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        validateForm()
    ],
    updateEvent
)

router.delete('/:id', deleteEvent)

module.exports = router