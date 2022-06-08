import mongoose from 'mongoose'

const updateSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    images:[{
        type: String,
        required: true,
      }]
})
const reportSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    reporter:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    images:[{
        type: String
          }],
})

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    images:[{
        type: String,
        required: true,
      }],
    price:{
        type:Number,
        required:true
    },
    collected:{
        type:Number,
        default:false
    },
    deadline:{
        type:Date,
        required:true
    },
    updates:[
        updateSchema
    ],
    likes: {
         type: [String],
          default: [] 
    },
    reports:[
        reportSchema
    ],
},
{
    timestamps:true
})

const Post = mongoose.model("posts",postSchema)


export default Post