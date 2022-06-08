import cloudinary from "cloudinary"
import express from 'express'
import multer from 'multer'
import { protect } from "../middlewares/authMiddleware.js"
import fs from 'fs'
const router = express.Router()



cloudinary.config({
    cloud_name: 'senyou',
    api_key: '219197996594343',
    api_secret: 'kH1weBXQgMqf2CqmxLbMu9Xtkl8'
})
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })



async function uploadToCloudinary(locaFilePath) {
    // locaFilePath :
    // path of image which was just uploaded to "uploads" folder

    var mainFolderName = "main"
    // filePathOnCloudinary :
    // path of image we want when it is uploded to cloudinary
    var filePathOnCloudinary = mainFolderName + "/" + locaFilePath

    return cloudinary.uploader.upload(locaFilePath, { "public_id": filePathOnCloudinary })
        .then((result) => {
            // Image has been successfully uploaded on cloudinary
            // So we dont need local image file anymore
            // Remove file from local uploads folder 
            fs.unlinkSync(locaFilePath)

            return {
                message: "Success",
                url: result.url
            };
        }).catch((error) => {
            // Remove file from local uploads folder 
            fs.unlinkSync(locaFilePath)
            return { message: "Fail", };
        });
}

router.post('/multiple',protect, upload.array('file', 12), async (req, res, next) => {
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    var imageUrlList = []
    
    for(var i=0;i<req.files.length;i++){
      var locaFilePath = req.files[i].path
      var result = await uploadToCloudinary(locaFilePath)
      imageUrlList.push(result.url)
    }
    
    return res.json(imageUrlList)
})


export default router