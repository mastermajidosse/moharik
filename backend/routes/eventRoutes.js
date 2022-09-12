import express from 'express'
import { createEvent,editEvent,getEventById,getUpcomingEvents } from '../controllers/eventControllers.js'
import { admin,protect } from '../middlewares/authMiddleware.js'


const router = express.Router()



router
    .route('/')
    .get(getUpcomingEvents)
    .post(protect,admin,createEvent)

router
    .route('/:id')
    .post(protect,admin,editEvent)
    .get(protect,admin,getEventById)




export default router