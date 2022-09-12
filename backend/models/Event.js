import mongoose from "mongoose";


const eventSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    date:{
        type: Date,
		required: true,
    }
},{
    timestamps:true
})


const Event =  mongoose.model("Event",eventSchema)


export default Event