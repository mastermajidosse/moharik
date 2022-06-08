import express from 'express'
import { blockUser, deleteUser, getUserById, getUserProfile, getUsers, login, register, unblockUser, updateUser, updateUserProfile } from '../controllers/userControllers.js'
import { admin, protect } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.route('/').get(protect,admin,getUsers)
router.route('/login').post(login)
router.route('/register').post(register)
router
  .route('/profile')
  .get(protect,getUserProfile)
  .put(protect,updateUserProfile)

router
  .route('/:id')
  .delete(protect, admin,deleteUser)
  .get(protect, admin,getUserById)
  .put(protect, admin,updateUser)

router
    .route('/:id/block')
    .post(protect,admin,blockUser)

router
    .route('/:id/ublock')
    .post(protect,admin,unblockUser)

export default router