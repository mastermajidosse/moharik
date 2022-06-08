import asyncHandler from 'express-async-handler'
import Moto from '../models/Moto.js'


// @desc    Fetch all motos
// @route   GET /api/motos
// @access  Public
const getMotos = asyncHandler(async(req,res) => {
    const motos = await Moto.find({})
    if(motos && motos.length > 0) {
        res.status(201).json(motos)
    } else {
        res.status(201).json({message:"No mottos exist yet.."})
    }
})
// @desc    Create a moto
// @route   POST /api/motos
// @access  Private Admin
const createMoto = asyncHandler(async(req,res) => {
    const {content} = req.body
    const moto = new Moto({
        content
    })
    const createdMoto = await moto.save()
    res.status(201).json(createdMoto)
})

// @desc    Edit a moto by Id
// @route   POST /api/motos/:id
// @access  Private Admin
const editMotoById = asyncHandler(async(req,res) => {
    const {id} = req.params
    const { content } = req.body
    const moto = await Moto.findById(id)
    if(moto) {
        moto.content = content
        await moto.save()
        res.status(201).json(moto)
    } else {
        res.status(404).json({message:"No motto found"})
    }
})
// @desc    Delete a moto by Id
// @route   Delete /api/motos/:id
// @access  Private Admin
const deleteMotoById = asyncHandler(async(req,res) => {
    const { id } = req.params
    const moto = await Moto.findById(id)
    if(moto) {
        await moto.remove()
        res.status(201).json({message:"Moto removed"})
    } else {
        res.status(404).json({message:"No motto found"})
    }
})

export {
    getMotos,
    createMoto,
    editMotoById,
    deleteMotoById
}