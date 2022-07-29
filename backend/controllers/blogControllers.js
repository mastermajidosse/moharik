import asyncHandler from 'express-async-handler'
import Blog from '../models/blogPost.js'
import mongoose from 'mongoose'

// @desc    Fetch all articles
// @route   GET /api/blog
// @access  Public
const getArticles = asyncHandler(async (req, res) => {
    const articles = await Blog.find({})
    res.status(200).json(articles)
})


// @desc    create an article
// @route   POST /api/blog
// @access  Private/Admin
const createArticle = asyncHandler(async (req, res) => {
    const {
        title, content, images
    } = req.body

    const article = new Blog()
    article.title = title
    article.content = content
    article.images = images
    const createdArticle = await article.save()
    
    res.status(201).json(createdArticle)
})
// @desc    edit an article
// @route   POST /api/blog/:id
// @access  Private/Admin
const updateArticle = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const { title, content, images } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});
    const article = await Blog.findById(id)
    article.title = title || article.title
    article.content = content || article.content
    article.images = images || article.images

    await article.save()
    res.status(201).json(article)
})

// @desc    delete an article
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteArticle = asyncHandler(async(req,res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});
    const article = await Blog.findById(id)
    if(article) {
        await article.remove()
        res.status(201).json({ message: "Post removed" })
    } else {
        res.status(404).json({message:"Article not found"})
    }
})



export {
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle
}