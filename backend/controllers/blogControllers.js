import asyncHandler from 'express-async-handler'
import Blog from '../models/blogPost.js'
import mongoose from 'mongoose'

// @desc    Fetch all articles
// @route   GET /api/blog
// @access  Public
const getArticles = asyncHandler(async (req, res) => {
    const articles = await Blog.find({status:"approved"}).populate({
        path:"creator",
        select:"-password -savedPosts -createdAt -updatedAt"
    })
    res.status(200).json(articles)
})


// @desc    create an article
// @route   POST /api/blog
// @access  Private/Admin
const createArticle = asyncHandler(async (req, res) => {
    const {
        title, content, image
    } = req.body

    const article = new Blog()
    article.title = title
    article.content = content
    article.image = image
    article.creator = req.user.id
    const createdArticle = await article.save()
    
    res.status(201).json(createdArticle)
})
// @desc    Fetch an article by its id
// @route   GET /api/blog/:id
// @access  Public
const getArticleById = asyncHandler(async(req,res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No post with id: ${id}` });
    const article = await Blog.findById(id).populate({
        path: "creator",
        select: "-password -savedPosts -createdAt -updatedAt"
    })
    if(article) {
        res.status(200).json(article)
    } else {
        res.status(404).json({message:"There is not post "})
    }
})

// @desc    Fetch an article 
// @route   GET /api/blog/top
// @access  Public
const getTopArticle = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const article = await Blog.findOne({status:"top"}).populate({
        path: "creator",
        select: "-password -savedPosts -createdAt -updatedAt"
    })
    if(article) {
        res.status(200).json(article)
    } else {
        res.status(404).json({message:"There is not post "})
    }
})

// @desc    edit an article
// @route   POST /api/blog/:id
// @access  Private/Admin
const updateArticle = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const { title, content, image } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});
    const article = await Blog.findById(id)
    article.title = title || article.title
    article.content = content || article.content
    article.image = image || article.image

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
    deleteArticle,
    getArticleById,
    getTopArticle
}