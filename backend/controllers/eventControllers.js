import asyncHandler from 'express-async-handler'
import Event from '../models/Event.js'

// @desc    Fetch all upcoming events
// @route   GET /api/events
// @access  Public

const getUpcomingEvents = asyncHandler(async(req,res) => {
    const events = await Event.find({
        "date":{
            "$gte":new Date().toLocaleDateString()
        }
    })

    res.status(200).json(events)
})

// @desc    Create an event by the admin
// @route   POST /api/events
// @access  Private Admin

const createEvent = asyncHandler(async(req,res) => {
    const {
        image,name,desc,link,date
    } = req.body

    const event = new Event()
    event.name = name
    event.image = image
    event.desc = desc
    event.link = link
    event.date = date

    const createdEvent = await event.save()

    if(createdEvent) {
        res.status(201).json(createdEvent)
    } else {
        res.status(401).json({
            message:"Something went wrong"
        })
    }

})

// @desc    Edit an event by Id
// @route   POST /api/events/:id
// @access  Private Admin
const editEvent = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { image,name,desc,link,date } = req.body
    const event = await Event.findById(id)
    if (event) {
        event.name = name || event.name
        event.image = image || event.image
        event.desc = desc || event.desc
        event.link = link ||  event.link
        event.date = date || event.date
        await event.save()
        res.status(201).json(event)
    } else {
        res.status(404).json({ message: "No motto found" })
    }
})

// @desc    Get an event by its Id
// @route   Get /api/event/:id
// @access  Public/admin
const getEventById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const event = await Event.findById(id)
	if (event) {
		res.status(200).json(event);
	} else {
		res.status(404).json({ message: 'Event not found' });
	}
});





export{
    createEvent,
    getUpcomingEvents,
    editEvent,
    getEventById
}