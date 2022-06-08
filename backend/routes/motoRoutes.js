import express from 'express'
import { createMoto, deleteMotoById, editMotoById, getMotos } from '../controllers/motoControllers.js'
import { protect,admin} from '../middlewares/authMiddleware.js'


const router = express.Router()


router.route('/').get(getMotos).post(protect,admin,createMoto)
router.route('/:id').post(protect,admin,editMotoById).delete(protect,admin,deleteMotoById)


export default router