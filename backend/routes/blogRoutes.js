import express from 'express'
import { admin,protect } from '../middlewares/authMiddleware.js'
import { getArticles,createArticle, updateArticle, deleteArticle, getArticleById, getTopArticle} from '../controllers/blogControllers.js'

const router = express.Router()

router
    .route('/')
    .get(getArticles)
    .post(protect,admin,createArticle)

router
    .route('/top')
    .get(getTopArticle)

router
    .route('/:id')
    .get(getArticleById)
    .post(protect,admin,updateArticle)
    .delete(protect,admin,deleteArticle)


 


export default router