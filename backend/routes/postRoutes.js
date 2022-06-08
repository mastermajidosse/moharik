import express from 'express'
import { getPosts,createPost, getPostById,editPostById, deletePost, getUpdates, addUpdate, editUpdate, deleteUpdate, likePost, reportPost, getReports, deleteReport,getPostsByUserId } from '../controllers/postControllers.js'
import { protect,admin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router
    .route('/')
    .get(getPosts)
    .post(protect,createPost)

router
    .route('/:id')
    .get(getPostById)
    .post(protect,editPostById)
    .delete(protect,deletePost)

router
    .route('/user/:id')
    .get(getPostsByUserId)
    

router
    .route('/:id/like')
    .post(protect,likePost)

router
    .route('/:id/report/:report_id')
    .get(protect,admin,getReports)
    .post(protect,reportPost)
    .delete(protect,admin,deleteReport)

router
    .route('/:id/update')
    .post(protect,addUpdate)
    .get(protect,getUpdates)

router
    .route('/:id/update/:update_id')
    .post(protect,editUpdate)
    .delete(protect,deleteUpdate)



export default router