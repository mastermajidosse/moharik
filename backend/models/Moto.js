import mongoose from 'mongoose'

const motoSchema = mongoose.Schema({
    content:{
        type:String
    }
})

const motosSchema = mongoose.Schema(
    [motoSchema]
,{
    timestamps:true
})


const Moto = mongoose.model("mottos",motosSchema)


export default Moto