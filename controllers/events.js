const Event = require("../models/Event")

const getEvents = async (req, res) => {
    const events = await Event.find().populate('user', 'name')

    res.json({
        ok: true,
        events
    })
}

const createEvent = async (req, res) => {
    const event = new Event(req.body)

    try {
        event.user = req.uid
        const savedEvent = await event.save()
        res.json({
            ok: true,
            event: savedEvent
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        })
    }
    
}

const updateEvent = async (req, res) => {

    const { id } = req.params

    try {

        const event = await Event.findById( id )

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'event does not exist'
            })
        }

        if( req.uid !== event.user.toString() ) {
            return res.status(401).json({
                ok: false,
                msg: 'User unauthorized'
            })
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( id, newEvent, { new: true })

        res.json({
            ok: true,
            event: updatedEvent
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        })
    }

}

const deleteEvent = async (req, res) => {

    const { id } = req.params

    try {
        const event = await Event.findById( id )

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'event does not exist'
            })
        }

        if( req.uid !== event.user.toString() ) {
            return res.status(401).json({
                ok: false,
                msg: 'User unauthorized'
            })
        }

        await Event.findByIdAndDelete(id)

        res.json({
            ok: true,
            msg: 'deleted'
        })
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        })
    }

    res.json({
        ok: true,
        msg: 'delete event'
    })
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}