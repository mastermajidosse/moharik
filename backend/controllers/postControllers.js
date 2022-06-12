import asyncHandler from 'express-async-handler'
import Post from "../models/Post.js"
import User from '../models/User.js'

const categories = [
    "thrive",
    "invention",
    "big",
    "digital",
    "incubator",
    "competition",
]
// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({createdAt: -1})
    if (posts && posts.length > 0) {
        res.status(200).json(posts)
    } else {
        res.status(200).json({ message: "No posts exist yet.." })
    }
})
// @desc    create a post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    const {
        title,
        desc,
        category,
        price,
        deadline,
        images
    } = req.body
   const user= req.user._id
    // this should be a standalone collection in db, which will be editable by super_admin 
    let cat = category.toLowerCase().replace(/\s/g, "")
    if (!categories.includes(cat))
        return res.status(400).json({ message: "this category does not exist" })

    const post = new Post({
        title, desc, category, price, deadline, images, user
    })
    const createdPost = await post.save()
    res.status(201).json(createdPost)
})
// @desc    Get a post by its Id
// @route   Get /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
    const { id } = req.params

    const post = await Post.findById(id)
    if (post) {
        res.status(200).json(post)
    } else {
        res.status(404).json({ message: "Post not found" })
    }
})
// @desc    Get posts by its user Id
// @route   Get /api/posts/user/:id
// @access  Public
const getPostsByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params

    const posts = await Post.find({user:id}).sort({createdAt: -1})
    console.log("posts: ", posts);
    if (posts) {
        res.status(200).json(posts)
    } else {
        res.status(404).json({ message: "Posts not found" })
    }
})

// @desc    Edit a post by its Id
// @route   POST /api/posts/:id
// @access  Private
const editPostById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const {
        title,
        desc,
        category,
        deadline,
        images
    } = req.body

    const post = await Post.findById(id)
    if (post) {
        if(post.user.toString() == req.user._id || req.user.isAdmin === true) {
            //check the category 
            let cat = category.toLowerCase().replace(/\s/g, "")
            if (!categories.includes(cat))
            return res.status(400).json({ message: "this category does not exist" })
    
    
            post.title = title || post.title
            post.desc = desc || post.desc
            post.category = category || post.category
            post.price = post.price
            post.deadline =  post.deadline
            post.images = images || post.images
    
            const updatedPost = await post.save()
            res.status(201).json(updatedPost)

        } else {
            res.status(401).json({message:"you are not authorized to edit this project"})
        }
    } else {
        res.status(404).json({ message: "Post not found..." })
    }
})
// @desc    Delete a post by its Id
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id)

    if (post) {
        if(post.user.toString() == req.user._id || req.user.isAdmin === true) {
            await post.remove()
            res.status(201).json({ message: "Post removed" })
        } else {
            res.status(401).json({message:"you are not authorized to delete this project"})
        }
    } else {
        res.status(404).json({ message: "Post not found..." })
    }
})



//Updates part
// @desc    GEt Updates
// @route   Get /api/posts/:id/update
// @access  Public
const getUpdates = asyncHandler(async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id)
    if (post) {
        res.status(200).json(post.updates)
    } else {
        res.status(404).json({ message: "Post not found..." })
    }
})

// @desc    add an update
// @route   POST /api/posts/:id/update
// @access  Private
const addUpdate = asyncHandler(async (req, res) => {
    const { title, desc, images } = req.body
    const { id } = req.params

    const post = await Post.findById(id)
    if (post) {
        if(post.user.toString() == req.user._id || req.user.isAdmin === true) {
            post.updates.push({ title, desc, images })
            const updatedPost = await post.save()
            res.status(201).json(updatedPost)
        } else {
            res.status(401).json({message:"you are not authorized to add an update of this project"})
        }
    } else {
        res.status(404).json({ message: "Post not found..." })
    }
})

// @desc    edit an update
// @route   POST /api/posts/:id/update/:update_id
// @access  Private
const editUpdate = asyncHandler(async (req, res) => {
    const { id, update_id } = req.params
    const { title, desc, images } = req.body
    const post = await Post.findById(id)
    if (post) {
        if(post.user.toString() == req.user._id || req.user.isAdmin === true) {
            const update = post.updates.find(post => post._id = update_id)
            if (update) {
                update.title = title || update.title
                update.desc = desc || update.desc
                update.images = images || update.images
            }
            const updatedPost = await post.save()
            res.status(201).json(updatedPost)
        } else {
            res.status(401).json({message:"you are not authorized to edit an update of this project"})
        }
    } else {
        res.status(404).json({ message: "Post not found..." })
    }
})
// @desc    delete an update
// @route   POST /api/posts/:id/update/:update_id/delete
// @access  Private
const deleteUpdate = asyncHandler(async (req, res) => {
    const { id, update_id } = req.params
    const post = await Post.findById(id)
    if (post) {
        if(post.user.toString() == req.user._id || req.user.isAdmin === true) {
            const update = post.updates.find(post => post._id = update_id)
            if (update) {
                post.updates = post.updates.filter(post => post._id != update_id)
            }
            await post.save()
            res.status(201).json({message:"Update removed"})
        } else {
            res.status(401).json({message:"you are not authorized to delete an update of this project"})
        }
    } else {
        res.status(404).json({ message: "post not found..." })
    }
})
// @desc    like a post
// @route   POST /api/posts/:id/like
// @access  Private
const likePost = asyncHandler(async(req,res) => {
    const {id } = req.params
    const post = await Post.findById(id);
    const user = await User.findById(req.user._id)

    if(!user) {
        return res.status(401).json({message:"you are not authorized, You need to login first"})
    }
    const index = post.likes.findIndex((id) => id === String(req.user._id));
    if (index === -1) {
      post.likes.push(req.user._id)
      user.savedPosts.push(post._id)
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.user._id))
      user.savedPosts.filter(id => id != String(post._id))
    }
    
    await user.save()
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(201).json(updatedPost);
})
// @desc    Report a post
// @route   POST /api/posts/:id/report
// @access  Private
const reportPost = asyncHandler(async(req,res) => {
    const { title, desc, images } = req.body
    const { id } = req.params
    const user = await User.findById(req.user._id)

    const post = await Post.findById(id)
    if (post) {
            post.reports.push({ title, desc, images,reporter:req.user._id })
            user.reports++;
            if(user.reports >= 5) {
                user.blocked = true;
            } 
            await user.save()
            const reportedPost = await post.save()
            res.status(201).json(reportedPost)
   
    } else {
        res.status(404).json({ message: "Post not found..." })
    }
})

// @desc    GEt reports of a spicific post
// @route   Get /api/posts/:id/report
// @access  Private
const getReports = asyncHandler(async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id).sort({createdAt: -1})
    if (post) {
        if(post.user.toString() == req.user._id || req.user.isAdmin === true) {
            res.status(200).json(post.reports)
        } else {
            res.status(401).json({message:"You are not allowed to access the report of other user"})
        }

    } else {
        res.status(404).json({ message: "Post not found..." })
    }
})
// @desc    delete an update
// @route   POST /api/posts/:id/update/:update_id/delete
// @access  Private
const deleteReport = asyncHandler(async (req, res) => {
    const { id, report_id } = req.params
    const post = await Post.findById(id)
    if (post) {
            const report = post.reports.find(post => post._id = report_id)
            if (report) {
                post.reports = post.reports.filter(report => report._id != report_id)
            }
            await post.save()
            res.status(201).json({message: "Report was deleted successfully."})
    } else {
        res.status(404).json({ message: "post not found..." })
    }
})

export {
    getPosts,
    createPost,
    getPostById,
    editPostById,
    deletePost,
    addUpdate,
    getUpdates,
    editUpdate,
    deleteUpdate,
    likePost,
    reportPost,
    getReports,
    deleteReport,
    getPostsByUserId
}