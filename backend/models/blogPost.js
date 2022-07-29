import mongoose from "mongoose";


const blogSchema = mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    images: [{
        type: String,
        required: true,
    }]
})

const Blog = mongoose.model('Blog',blogSchema)

export default Blog