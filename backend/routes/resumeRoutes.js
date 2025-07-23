import express from 'express'
import {protect} from '../middleware/authMiddleware.js'
import { createResume,deleteResume,getResumeById,getUserResumes, updateResume } from '../controllers/resumeController.js'
import { uploadResumeImages } from '../controllers/uploadImages.js'



const resumeRouter = express.Router()


resumeRouter.post('/',protect,createResume)
resumeRouter.get('/',protect,getUserResumes) //all resumes of user
resumeRouter.get('/:id',protect,getResumeById)  //individual resume of user selection
 
resumeRouter.put('/:id',protect,updateResume);
resumeRouter.put('/:id/upload-images',protect,uploadResumeImages)

resumeRouter.delete('/:id',protect,deleteResume)

export default resumeRouter;