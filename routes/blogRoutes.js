import { Router } from "express";

import { middlewareToProtect } from "../middlewares/authMidleware.js";
import { createblog, updateBlog } from "../controller/Blogcontroller.js";
import multer from 'multer'

const blogRouter = Router();
 

const storage = multer.memoryStorage()
const upload =multer({
  storage:storage
})
blogRouter.post('/create', middlewareToProtect,upload.single('image'),createblog);
blogRouter.put('/update/:id', middlewareToProtect, upload.single('image'), updateBlog);

export default blogRouter;