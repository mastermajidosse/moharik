import mongoose from "mongoose";


const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    status: {
			type: String,
			default: 'false',
		},
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
}, {
    timeStamps: true
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog