import express from 'express'
import { admin,protect } from '../middlewares/authMiddleware.js'
import { getArticles,createArticle, updateArticle, deleteArticle, getArticleById} from '../controllers/blogControllers.js'
//create,getAblogpost,getPosts,delete,edit

const router = express.Router()

router
    .route('/')
    .get(getArticles)
    .post(protect,admin,createArticle)


router
    .route('/:id')
    .get(getArticleById)
    .post(protect,admin,updateArticle)
    .delete(protect,admin,deleteArticle)


export default router