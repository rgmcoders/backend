import { deleteImg, uploadImg } from "../config/cloud.js";
import Blog from "../models/Posts.js";

const createblog =async (req,res)=>{
  try {
      const {title,content} = req.body
// console.log('req.user--->',req.user);
// console.log('req.file--->',req.file);


if(!req.file){
return res.status(400).json({messag:'image requied'})
}

const uploaData = await uploadImg(req.file)
if(!uploaData){
  return res.status(400).json({
    status:false,
    messag:"error in upload image"
  })
}
// console.log('upl--->',uploaData);
// console.log('url--->',uploaData.secure_url);
// console.log('public_id--->',uploaData.public_id);
let data = {
 title,
 content,
 author:req.user._id,
 image:uploaData.secure_url,
 public_id:uploaData.public_id
}
 const blog = await Blog.create(data);
 res.status(201).json({
  status:true,
  messag:'blog created succesfully',
  blog:blog
 })
  } catch (error) {
     res.status(404).json({
  status:false,
  messag:error.message,

 })
  }

}

 const updateBlog = async (req, res) => {
  try {
    const { id } = req.params; 
    const { title, content } = req.body;

    // 1. Check karein blog exist karta hai ya nahi
    let blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found!" });
    }

    let updatedData = { title, content };

    // 2. Agar user ne naye image ki file bheji hai
    if (req.file) {
      // A. Purani image delete karein Cloudinary se (agar database mein public_id saved hai)
      if (blog.public_id) {
        await deleteImg(blog.public_id); 
      }

      // B. Nayi image upload karein
      const newUploadData = await uploadImg(req.file);
      if (!newUploadData) {
        return res.status(400).json({ success: false, message: "Error in uploading new image" });
      }

      // C. Naye links data mein add karein
      updatedData.image = newUploadData.secure_url;
      updatedData.public_id = newUploadData.public_id;
    }

    // 3. Database update karein
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully ✅",
      blog: updatedBlog
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export {createblog,updateBlog}